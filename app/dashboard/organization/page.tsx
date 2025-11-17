"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n/context";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Plus, Trash2, RefreshCw, Link as LinkIcon, Unlink, Check } from "lucide-react";
import type { TeamMember } from "@/lib/mock-data";

export default function OrganizationPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const organization = useStore((state) => state.organization);
  const addTeamMember = useStore((state) => state.addTeamMember);
  const removeTeamMember = useStore((state) => state.removeTeamMember);
  const updateTeamMemberRole = useStore((state) => state.updateTeamMemberRole);

  const [activeTab, setActiveTab] = useState<"team" | "accounts" | "settings">("team");
  const [inviteDialog, setInviteDialog] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "editor" as TeamMember["role"],
  });

  const handleInvite = () => {
    addTeamMember({
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      joinedAt: new Date().toISOString(),
    });
    showToast(`${inviteForm.name} invited successfully`, "success");
    setInviteDialog(false);
    setInviteForm({ name: "", email: "", role: "editor" });
  };

  const handleRemoveMember = (id: string, name: string) => {
    removeTeamMember(id);
    showToast(`${name} removed from team`, "success");
  };

  const handleRoleUpdate = (id: string, name: string, newRole: TeamMember["role"]) => {
    updateTeamMemberRole(id, newRole);
    showToast(`${name}'s role updated to ${newRole}`, "info");
  };

  const tabs = [
    { id: "team" as const, label: t.organization.tabs.team },
    { id: "accounts" as const, label: t.organization.tabs.accounts },
    { id: "settings" as const, label: t.organization.tabs.settings },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{t.organization.title}</h1>
        <p className="text-gray-500 mt-1">{t.organization.subtitle}</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Team Tab */}
      {activeTab === "team" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{t.organization.team.title}</h2>
            <Button
              variant="primary"
              onClick={() => setInviteDialog(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t.organization.team.inviteNew}
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.organization.team.table.name}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.organization.team.table.email}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.organization.team.table.role}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      {t.organization.team.table.joinedAt}
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      {t.organization.team.table.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {organization.members.map((member) => (
                    <tr key={member.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <span className="font-medium text-gray-900">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{member.email}</td>
                      <td className="px-6 py-4">
                        <Select
                          value={member.role}
                          onChange={(e) =>
                            handleRoleUpdate(member.id, member.name, e.target.value as TeamMember["role"])
                          }
                          className="text-sm"
                        >
                          <option value="admin">{t.organization.team.roles.admin}</option>
                          <option value="editor">{t.organization.team.roles.editor}</option>
                          <option value="viewer">{t.organization.team.roles.viewer}</option>
                        </Select>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveMember(member.id, member.name)}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Accounts Tab */}
      {activeTab === "accounts" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">{t.organization.accounts.title}</h2>
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              {t.organization.accounts.connectNew}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {organization.connectedAccounts.map((account) => (
              <Card key={account.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          account.platform === "GOOGLE"
                            ? "bg-blue-100"
                            : "bg-purple-100"
                        }`}
                      >
                        {account.platform === "GOOGLE" ? (
                          <span className="text-2xl">G</span>
                        ) : (
                          <span className="text-2xl">M</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {account.accountName}
                        </h3>
                        <p className="text-sm text-gray-500">{account.accountId}</p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        account.status === "connected"
                          ? "success"
                          : account.status === "error"
                          ? "danger"
                          : "default"
                      }
                    >
                      {t.organization.accounts.status[account.status]}
                    </Badge>
                  </div>

                  {account.lastSync && (
                    <p className="text-xs text-gray-500 mb-4">
                      {t.organization.accounts.table.lastSync}:{" "}
                      {new Date(account.lastSync).toLocaleString()}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="flex-1 gap-2">
                      <RefreshCw className="w-4 h-4" />
                      {t.organization.accounts.actions.sync}
                    </Button>
                    <Button size="sm" variant="ghost" className="flex-1 gap-2">
                      <Unlink className="w-4 h-4" />
                      {t.organization.accounts.actions.disconnect}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t.organization.settings.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.organization.settings.orgName}
                </label>
                <Input
                  defaultValue={organization.name}
                  placeholder={t.organization.settings.orgNamePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.organization.settings.timezone}
                </label>
                <Select defaultValue={organization.timezone}>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="America/Sao_Paulo">Brasília Time (BRT)</option>
                  <option value="Europe/London">London (GMT)</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.organization.settings.currency}
                </label>
                <Select defaultValue={organization.currency}>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="BRL">Brazilian Real (BRL)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                </Select>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  {t.organization.settings.notifications}
                </h3>
                <div className="space-y-3">
                  <Switch
                    label={t.organization.settings.emailNotifications}
                    defaultChecked
                  />
                  <Switch label={t.organization.settings.slackNotifications} />
                </div>
              </div>

              <div className="pt-4">
                <Button variant="primary">
                  <Check className="w-4 h-4 mr-2" />
                  {t.organization.settings.save}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invite Dialog */}
      <Dialog open={inviteDialog} onClose={() => setInviteDialog(false)}>
        <DialogHeader>
          <DialogTitle>{t.organization.team.inviteModal.title}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.organization.team.inviteModal.name}
              </label>
              <Input
                value={inviteForm.name}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, name: e.target.value })
                }
                placeholder={t.organization.team.inviteModal.namePlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.organization.team.inviteModal.email}
              </label>
              <Input
                type="email"
                value={inviteForm.email}
                onChange={(e) =>
                  setInviteForm({ ...inviteForm, email: e.target.value })
                }
                placeholder={t.organization.team.inviteModal.emailPlaceholder}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.organization.team.inviteModal.role}
              </label>
              <Select
                value={inviteForm.role}
                onChange={(e) =>
                  setInviteForm({
                    ...inviteForm,
                    role: e.target.value as TeamMember["role"],
                  })
                }
              >
                <option value="admin">{t.organization.team.roles.admin}</option>
                <option value="editor">{t.organization.team.roles.editor}</option>
                <option value="viewer">{t.organization.team.roles.viewer}</option>
              </Select>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setInviteDialog(false)}>
            {t.organization.team.inviteModal.cancel}
          </Button>
          <Button
            variant="primary"
            onClick={handleInvite}
            disabled={!inviteForm.name || !inviteForm.email}
          >
            {t.organization.team.inviteModal.send}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
