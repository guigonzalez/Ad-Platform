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
import { Plus, Edit2, Trash2, Clock } from "lucide-react";
import type { AutomationRule } from "@/lib/mock-data";

export default function AutomationsPage() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const automationRules = useStore((state) => state.automationRules);
  const campaigns = useStore((state) => state.campaigns);
  const toggleAutomationRule = useStore((state) => state.toggleAutomationRule);
  const createAutomationRule = useStore((state) => state.createAutomationRule);
  const updateAutomationRule = useStore((state) => state.updateAutomationRule);
  const deleteAutomationRule = useStore((state) => state.deleteAutomationRule);

  const [createDialog, setCreateDialog] = useState(false);
  const [editDialog, setEditDialog] = useState<AutomationRule | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<AutomationRule | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    metric: "ctr" | "cpc" | "spend" | "conversions";
    operator: "<" | ">" | "=";
    value: number;
    duration: number;
    actionType: "pause" | "reduce_budget" | "alert";
    budgetReduction: number;
    appliesTo: "all" | "specific";
    campaignId: string;
  }>({
    name: "",
    metric: "ctr",
    operator: "<",
    value: 1,
    duration: 3,
    actionType: "pause",
    budgetReduction: 20,
    appliesTo: "all",
    campaignId: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      metric: "ctr",
      operator: "<",
      value: 1,
      duration: 3,
      actionType: "pause",
      budgetReduction: 20,
      appliesTo: "all",
      campaignId: "",
    });
  };

  const handleCreate = () => {
    createAutomationRule({
      name: formData.name,
      enabled: true,
      trigger: {
        metric: formData.metric,
        operator: formData.operator,
        value: formData.value,
        duration: formData.duration,
      },
      action: {
        type: formData.actionType,
        value: formData.actionType === "reduce_budget" ? formData.budgetReduction : undefined,
      },
      appliesTo: formData.appliesTo === "all" ? "all" : formData.campaignId,
    });
    showToast(`Automation rule "${formData.name}" created successfully`, "success");
    setCreateDialog(false);
    resetForm();
  };

  const handleEdit = () => {
    if (editDialog) {
      updateAutomationRule(editDialog.id, {
        name: formData.name,
        trigger: {
          metric: formData.metric,
          operator: formData.operator,
          value: formData.value,
          duration: formData.duration,
        },
        action: {
          type: formData.actionType,
          value: formData.actionType === "reduce_budget" ? formData.budgetReduction : undefined,
        },
        appliesTo: formData.appliesTo === "all" ? "all" : formData.campaignId,
      });
      showToast(`Automation rule "${formData.name}" updated successfully`, "success");
      setEditDialog(null);
      resetForm();
    }
  };

  const handleToggle = (id: string, name: string, currentState: boolean) => {
    toggleAutomationRule(id);
    showToast(`Automation rule "${name}" ${currentState ? "disabled" : "enabled"}`, "info");
  };

  const handleDeleteConfirm = () => {
    if (deleteDialog) {
      deleteAutomationRule(deleteDialog.id);
      showToast(`Automation rule "${deleteDialog.name}" deleted successfully`, "success");
      setDeleteDialog(null);
    }
  };

  const openEdit = (rule: AutomationRule) => {
    setFormData({
      name: rule.name,
      metric: rule.trigger.metric,
      operator: rule.trigger.operator,
      value: rule.trigger.value,
      duration: rule.trigger.duration || 3,
      actionType: rule.action.type,
      budgetReduction: rule.action.value || 20,
      appliesTo: rule.appliesTo === "all" ? "all" : "specific",
      campaignId: rule.appliesTo === "all" ? "" : rule.appliesTo,
    });
    setEditDialog(rule);
  };

  const formatTrigger = (rule: AutomationRule) => {
    const { metric, operator, value, duration } = rule.trigger;
    const metricText = t.automations.triggers.metric[metric];
    const operatorText = t.automations.triggers.operator[
      operator === "<" ? "lessThan" : operator === ">" ? "greaterThan" : "equals"
    ];
    return `${t.automations.triggers.if} ${metricText} ${operatorText} ${value}${
      duration ? ` ${t.automations.triggers.for} ${duration} ${t.automations.triggers.days}` : ""
    }`;
  };

  const formatAction = (rule: AutomationRule) => {
    const { type, value } = rule.action;
    if (type === "reduce_budget") {
      return `${t.automations.actions.then} ${t.automations.actions.reducebudget} ${value}%`;
    }
    return `${t.automations.actions.then} ${t.automations.actions[type]}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.automations.title}</h1>
          <p className="text-gray-500 mt-1">{t.automations.subtitle}</p>
        </div>
        <Button
          variant="primary"
          onClick={() => setCreateDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {t.automations.createNew}
        </Button>
      </div>

      {/* Rules List */}
      <div className="space-y-4">
        {automationRules.map((rule) => (
          <Card key={rule.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{rule.name}</h3>
                    <Switch
                      checked={rule.enabled}
                      onChange={() => handleToggle(rule.id, rule.name, rule.enabled)}
                    />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{t.automations.list.trigger}:</span>
                      <span>{formatTrigger(rule)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{t.automations.list.action}:</span>
                      <span>{formatAction(rule)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <span className="font-medium">{t.automations.list.appliesTo}:</span>
                      <span>
                        {rule.appliesTo === "all"
                          ? t.automations.appliesTo.all
                          : campaigns.find((c) => c.id === rule.appliesTo)?.name ||
                            t.automations.appliesTo.specific}
                      </span>
                    </div>
                    {rule.lastRun && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />
                        {t.automations.list.lastRun}: {new Date(rule.lastRun).toLocaleString()}
                        {" • "}
                        {t.automations.list.timesTriggered}: {rule.timesTriggered}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => openEdit(rule)}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setDeleteDialog(rule)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog
        open={createDialog || !!editDialog}
        onClose={() => {
          setCreateDialog(false);
          setEditDialog(null);
          resetForm();
        }}
      >
        <DialogHeader>
          <DialogTitle>
            {editDialog ? t.automations.form.editTitle : t.automations.form.title}
          </DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.automations.form.ruleName}
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.automations.form.ruleNamePlaceholder}
              />
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                {t.automations.form.triggerSection}
              </h4>
              <div className="grid grid-cols-3 gap-2">
                <Select
                  value={formData.metric}
                  onChange={(e) =>
                    setFormData({ ...formData, metric: e.target.value as typeof formData.metric })
                  }
                >
                  <option value="ctr">{t.automations.triggers.metric.ctr}</option>
                  <option value="cpc">{t.automations.triggers.metric.cpc}</option>
                  <option value="spend">{t.automations.triggers.metric.spend}</option>
                  <option value="conversions">{t.automations.triggers.metric.conversions}</option>
                </Select>
                <Select
                  value={formData.operator}
                  onChange={(e) =>
                    setFormData({ ...formData, operator: e.target.value as typeof formData.operator })
                  }
                >
                  <option value="<">&lt;</option>
                  <option value=">">&gt;</option>
                  <option value="=">=</option>
                </Select>
                <Input
                  type="number"
                  value={formData.value}
                  onChange={(e) =>
                    setFormData({ ...formData, value: parseFloat(e.target.value) })
                  }
                  step="0.1"
                />
              </div>
              <div className="mt-2">
                <label className="block text-xs text-gray-600 mb-1">
                  {t.automations.form.duration}
                </label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: parseInt(e.target.value) })
                  }
                  min="1"
                />
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                {t.automations.form.actionSection}
              </h4>
              <Select
                value={formData.actionType}
                onChange={(e) =>
                  setFormData({ ...formData, actionType: e.target.value as typeof formData.actionType })
                }
              >
                <option value="pause">{t.automations.actions.pause}</option>
                <option value="reduce_budget">{t.automations.actions.reducebudget}</option>
                <option value="alert">{t.automations.actions.alert}</option>
              </Select>
              {formData.actionType === "reduce_budget" && (
                <div className="mt-2">
                  <label className="block text-xs text-gray-600 mb-1">
                    {t.automations.form.budgetReduction}
                  </label>
                  <Input
                    type="number"
                    value={formData.budgetReduction}
                    onChange={(e) =>
                      setFormData({ ...formData, budgetReduction: parseInt(e.target.value) })
                    }
                    min="1"
                    max="100"
                  />
                </div>
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                {t.automations.form.appliesToSection}
              </h4>
              <Select
                value={formData.appliesTo}
                onChange={(e) =>
                  setFormData({ ...formData, appliesTo: e.target.value as typeof formData.appliesTo })
                }
              >
                <option value="all">{t.automations.form.allCampaigns}</option>
                <option value="specific">{t.automations.form.specificCampaign}</option>
              </Select>
              {formData.appliesTo === "specific" && (
                <div className="mt-2">
                  <Select
                    value={formData.campaignId}
                    onChange={(e) =>
                      setFormData({ ...formData, campaignId: e.target.value })
                    }
                  >
                    <option value="">{t.automations.form.selectCampaign}</option>
                    {campaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setCreateDialog(false);
              setEditDialog(null);
              resetForm();
            }}
          >
            {t.automations.form.cancel}
          </Button>
          <Button
            variant="primary"
            onClick={editDialog ? handleEdit : handleCreate}
            disabled={!formData.name}
          >
            {t.automations.form.save}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteDialog} onClose={() => setDeleteDialog(null)}>
        <DialogHeader>
          <DialogTitle>{t.campaigns.deleteModal.title}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p className="text-sm text-gray-600">
            {t.campaigns.deleteModal.message}
          </p>
          {deleteDialog && (
            <p className="mt-2 text-sm font-medium text-gray-900">
              {deleteDialog.name}
            </p>
          )}
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setDeleteDialog(null)}>
            {t.campaigns.deleteModal.cancel}
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteConfirm}
          >
            {t.campaigns.deleteModal.confirm}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
