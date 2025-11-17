"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { useTranslation } from "@/lib/i18n/context";
import { useToast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { TableSkeleton } from "@/components/ui/skeleton";
import { formatCurrency, formatNumber, formatPercentage, formatDate } from "@/lib/utils";
import {
  Plus,
  Search,
  Pause,
  Play,
  Edit2,
  Copy,
  Trash2,
  MoreVertical,
  Filter,
  Image as ImageIcon,
  Megaphone,
  SearchX,
  FolderKanban,
  ChevronDown,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import type { Campaign, CampaignGroup } from "@/lib/mock-data";

export default function CampaignsPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { showToast } = useToast();
  const campaigns = useStore((state) => state.campaigns);
  const campaignGroups = useStore((state) => state.campaignGroups);
  const pauseCampaign = useStore((state) => state.pauseCampaign);
  const resumeCampaign = useStore((state) => state.resumeCampaign);
  const pauseCampaignGroup = useStore((state) => state.pauseCampaignGroup);
  const resumeCampaignGroup = useStore((state) => state.resumeCampaignGroup);
  const updateCampaignBudget = useStore((state) => state.updateCampaignBudget);
  const duplicateCampaign = useStore((state) => state.duplicateCampaign);
  const deleteCampaign = useStore((state) => state.deleteCampaign);

  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editBudgetDialog, setEditBudgetDialog] = useState<Campaign | null>(null);
  const [newBudget, setNewBudget] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<Campaign | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Initialize all groups as expanded
  useEffect(() => {
    if (campaignGroups.length > 0 && expandedGroups.size === 0) {
      setExpandedGroups(new Set(campaignGroups.map((g) => g.id)));
    }
  }, [campaignGroups]);

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) {
        next.delete(groupId);
      } else {
        next.add(groupId);
      }
      return next;
    });
  };

  // Filter campaigns
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "all" || campaign.platform === platformFilter;
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesPlatform && matchesStatus;
  });

  // Organize campaigns by groups
  const groupedCampaigns = campaignGroups.map((group) => ({
    group,
    campaigns: filteredCampaigns.filter((c) => c.groupId === group.id),
  }));

  const ungroupedCampaigns = filteredCampaigns.filter((c) => !c.groupId);

  const getGroupBudgetInfo = (group: CampaignGroup) => {
    const groupCampaigns = campaigns.filter((c) => c.groupId === group.id);
    const totalDailyBudget = groupCampaigns.reduce((sum, c) => sum + c.dailyBudget, 0);
    const totalSpent = groupCampaigns.reduce((sum, c) => sum + c.spent, 0);
    const budgetUsagePercent = (totalDailyBudget / group.dailyBudgetLimit) * 100;
    return { totalDailyBudget, totalSpent, budgetUsagePercent };
  };

  const handlePause = (id: string, name: string) => {
    pauseCampaign(id);
    showToast(`Campaign "${name}" paused successfully`, "success");
  };

  const handleResume = (id: string, name: string) => {
    resumeCampaign(id);
    showToast(`Campaign "${name}" resumed successfully`, "success");
  };

  const handleDuplicate = (id: string, name: string) => {
    duplicateCampaign(id);
    showToast(`Campaign "${name}" duplicated successfully`, "success");
  };

  const handleEditBudget = () => {
    if (editBudgetDialog && newBudget) {
      updateCampaignBudget(editBudgetDialog.id, parseFloat(newBudget));
      showToast(`Budget updated to ${formatCurrency(parseFloat(newBudget))}`, "success");
      setEditBudgetDialog(null);
      setNewBudget("");
    }
  };

  const handleDelete = () => {
    if (deleteDialog) {
      deleteCampaign(deleteDialog.id);
      showToast(`Campaign "${deleteDialog.name}" deleted successfully`, "success");
      setDeleteDialog(null);
    }
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      ACTIVE: "success" as const,
      PAUSED: "warning" as const,
      ENDED: "default" as const,
    };
    return (
      <Badge variant={variants[status]}>
        {t.campaigns.status[status.toLowerCase() as keyof typeof t.campaigns.status]}
      </Badge>
    );
  };

  const getPlatformBadge = (platform: Campaign["platform"]) => {
    return (
      <Badge
        className={
          platform === "GOOGLE"
            ? "bg-blue-100 text-blue-800"
            : "bg-purple-100 text-purple-800"
        }
      >
        {platform}
      </Badge>
    );
  };

  // Campaign Row Component
  const CampaignRow = ({ campaign, isInGroup = false }: { campaign: Campaign; isInGroup?: boolean }) => (
    <tr className="hover:bg-gray-50">
      <td className={`px-6 py-4 whitespace-nowrap ${isInGroup ? "pl-12" : ""}`}>
        {getStatusBadge(campaign.status)}
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
        <div className="text-xs text-gray-500">
          {formatDate(campaign.startDate)}
          {campaign.endDate && ` - ${formatDate(campaign.endDate)}`}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {getPlatformBadge(campaign.platform)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
        {formatCurrency(campaign.dailyBudget)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
        {formatCurrency(campaign.spent)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
        {formatNumber(campaign.impressions)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
        {formatNumber(campaign.clicks)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
        {formatPercentage(campaign.ctr)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
        {campaign.conversions}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-2">
          <Link href={`/dashboard/campaigns/${campaign.id}/assets`}>
            <Button
              size="sm"
              variant="ghost"
              title="View Assets"
            >
              <ImageIcon className="w-4 h-4" />
            </Button>
          </Link>
          {campaign.status === "ACTIVE" ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handlePause(campaign.id, campaign.name)}
              title={t.campaigns.actions.pause}
            >
              <Pause className="w-4 h-4" />
            </Button>
          ) : campaign.status === "PAUSED" ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleResume(campaign.id, campaign.name)}
              title={t.campaigns.actions.resume}
            >
              <Play className="w-4 h-4" />
            </Button>
          ) : null}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setEditBudgetDialog(campaign);
              setNewBudget(campaign.dailyBudget.toString());
            }}
            title={t.campaigns.actions.editBudget}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDuplicate(campaign.id, campaign.name)}
            title={t.campaigns.actions.duplicate}
          >
            <Copy className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setDeleteDialog(campaign)}
            title={t.campaigns.actions.delete}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.campaigns.title}</h1>
          <p className="text-gray-500 mt-1">{t.campaigns.subtitle}</p>
        </div>
        <Link href="/dashboard/campaigns/create">
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            {t.campaigns.createNew}
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t.campaigns.filters.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Dropdown
              value={platformFilter}
              onChange={setPlatformFilter}
              options={[
                { value: "all", label: t.campaigns.filters.allPlatforms },
                { value: "GOOGLE", label: "Google Ads" },
                { value: "META", label: "Meta Ads" },
              ]}
            />
            <Dropdown
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: t.campaigns.filters.allStatus },
                { value: "ACTIVE", label: t.campaigns.status.active },
                { value: "PAUSED", label: t.campaigns.status.paused },
                { value: "ENDED", label: t.campaigns.status.ended },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      {!isLoading && campaigns.length > 0 && (
        <div className="text-sm text-gray-600">
          {filteredCampaigns.length} {filteredCampaigns.length === 1 ? "campaign" : "campaigns"}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <TableSkeleton rows={5} />
          </CardContent>
        </Card>
      )}

      {/* Empty State - No campaigns at all */}
      {!isLoading && campaigns.length === 0 && (
        <Card>
          <CardContent>
            <EmptyState
              icon={Megaphone}
              title="No campaigns yet"
              description="Create your first AI-powered campaign by importing assets from our AI platform."
              action={{
                label: "Create Campaign",
                onClick: () => router.push("/dashboard/campaigns/create"),
              }}
            />
          </CardContent>
        </Card>
      )}

      {/* Empty State - No filtered results */}
      {!isLoading && campaigns.length > 0 && filteredCampaigns.length === 0 && (
        <Card>
          <CardContent>
            <EmptyState
              icon={SearchX}
              title="No campaigns found"
              description="Try adjusting your filters or search query to find what you're looking for."
            />
          </CardContent>
        </Card>
      )}

      {/* Campaigns Table */}
      {!isLoading && filteredCampaigns.length > 0 && (
        <div className="space-y-4">
          {/* Campaign Groups */}
          {groupedCampaigns.map(({ group, campaigns: groupCampaigns }) => {
            if (groupCampaigns.length === 0) return null;
            const { totalDailyBudget, totalSpent, budgetUsagePercent } = getGroupBudgetInfo(group);
            const isExpanded = expandedGroups.has(group.id);
            const isOverBudget = totalDailyBudget > group.dailyBudgetLimit;

            return (
              <Card key={group.id} className="overflow-hidden">
                {/* Group Header */}
                <div
                  className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-black p-4 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-colors"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 text-black font-bold">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5" />
                        ) : (
                          <ChevronRight className="w-5 h-5" />
                        )}
                        <FolderKanban className="w-5 h-5 text-blue-600" />
                        <span className="text-lg uppercase">{group.name}</span>
                      </button>
                      {getStatusBadge(group.status)}
                      <Badge variant="info" className="text-xs">
                        {groupCampaigns.length} campaigns
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-600 uppercase">Budget Usage</p>
                        <p className={`text-sm font-bold ${isOverBudget ? "text-red-600" : "text-gray-900"}`}>
                          {formatCurrency(totalDailyBudget)} / {formatCurrency(group.dailyBudgetLimit)}
                          <span className="text-xs ml-1">
                            ({budgetUsagePercent.toFixed(0)}%)
                          </span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-gray-600 uppercase">Total Spent</p>
                        <p className="text-sm font-bold text-gray-900">
                          {formatCurrency(totalSpent)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {group.status === "ACTIVE" ? (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              pauseCampaignGroup(group.id);
                              showToast(`Group "${group.name}" paused`, "success");
                            }}
                            title="Pause Group"
                          >
                            <Pause className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              resumeCampaignGroup(group.id);
                              showToast(`Group "${group.name}" resumed`, "success");
                            }}
                            title="Resume Group"
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {isOverBudget && (
                    <div className="mt-2 flex items-center gap-2 text-xs font-bold text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      Warning: Combined campaign budgets exceed group limit
                    </div>
                  )}
                </div>

                {/* Group Campaigns */}
                {isExpanded && (
                  <CardContent className="p-0">
                    <div className="overflow-x-auto scrollbar-thin">
                      <table className="w-full min-w-[1200px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.status}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.name}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.platform}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.dailyBudget}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.spent}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.impressions}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.clicks}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.ctr}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.conversions}
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              {t.campaigns.table.actions}
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {groupCampaigns.map((campaign) => (
                            <CampaignRow key={campaign.id} campaign={campaign} isInGroup={true} />
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}

          {/* Ungrouped Campaigns */}
          {ungroupedCampaigns.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold uppercase text-gray-600">
                  Standalone Campaigns ({ungroupedCampaigns.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto scrollbar-thin">
                  <table className="w-full min-w-[1200px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.status}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.name}
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.platform}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.dailyBudget}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.spent}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.impressions}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.clicks}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.ctr}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.conversions}
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {t.campaigns.table.actions}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ungroupedCampaigns.map((campaign) => (
                        <CampaignRow key={campaign.id} campaign={campaign} isInGroup={false} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Edit Budget Dialog */}
      <Dialog open={!!editBudgetDialog} onClose={() => setEditBudgetDialog(null)}>
        <DialogHeader>
          <DialogTitle>{t.campaigns.editBudgetModal.title}</DialogTitle>
        </DialogHeader>
        <DialogContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.campaigns.editBudgetModal.currentBudget}
              </label>
              <p className="text-lg font-semibold">
                {editBudgetDialog && formatCurrency(editBudgetDialog.dailyBudget)}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t.campaigns.editBudgetModal.newBudget}
              </label>
              <Input
                type="number"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setEditBudgetDialog(null)}>
            {t.campaigns.editBudgetModal.cancel}
          </Button>
          <Button variant="primary" onClick={handleEditBudget}>
            {t.campaigns.editBudgetModal.save}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Delete Confirmation Dialog */}
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
          <Button variant="danger" onClick={handleDelete}>
            {t.campaigns.deleteModal.confirm}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
