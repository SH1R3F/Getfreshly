'use client';

import { useState } from 'react';
import { Button } from '@repo/ui/components/button';
import { Card, CardContent } from '@repo/ui/components/card';
import { Settings } from 'lucide-react';
import MetricCustomizationDialog from './MetricCustomizationDialog';

export interface Metric {
  id: string;
  title: string;
  value: string | number;
  isVisible: boolean;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  order: number;
}

// Static data for all available metrics
const ALL_METRICS: Metric[] = [
  {
    id: 'impressions',
    title: 'Impressions',
    value: '3.5k',
    isVisible: true,
    trend: 'up',
    trendValue: '+12%',
    order: 0,
  },
  {
    id: 'engagement',
    title: 'Engagement',
    value: '4k',
    isVisible: true,
    trend: 'up',
    trendValue: '+8%',
    order: 1,
  },
  {
    id: 'ctr',
    title: 'CTR',
    value: '70%',
    isVisible: true,
    trend: 'neutral',
    order: 2,
  },
  {
    id: 'campaigns',
    title: 'No. of active campaigns',
    value: 12,
    isVisible: true,
    order: 3,
  },
  {
    id: 'adsets',
    title: 'No. of active ad sets',
    value: 24,
    isVisible: true,
    order: 4,
  },
  {
    id: 'ads',
    title: 'No. of active ads',
    value: 48,
    isVisible: true,
    order: 5,
  },
  {
    id: 'tested',
    title: 'ads tested this month',
    value: 15,
    isVisible: true,
    order: 6,
  },
  {
    id: 'spend',
    title: 'Total Spend',
    value: '$2,450',
    isVisible: false,
    trend: 'up',
    trendValue: '+5%',
    order: 7,
  },
];

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>(ALL_METRICS);
  const [isCustomizationOpen, setIsCustomizationOpen] = useState(false);

  const visibleMetrics = metrics
    .filter((metric) => metric.isVisible)
    .sort((a, b) => a.order - b.order);

  const handleMetricToggle = (metricId: string) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === metricId
          ? { ...metric, isVisible: !metric.isVisible }
          : metric,
      ),
    );
  };

  const handleReorder = (draggedId: string, newIndex: number) => {
    setMetrics((prev) => {
      const newMetrics = [...prev];

      // Get only visible metrics for reordering
      const visibleMetricsForReorder = newMetrics.filter((m) => m.isVisible);

      // Find the dragged item
      const draggedIndex = visibleMetricsForReorder.findIndex(
        (m) => m.id === draggedId,
      );

      if (draggedIndex === -1) return prev;

      // Remove the dragged item
      const draggedItem = visibleMetricsForReorder[draggedIndex];
      if (!draggedItem) return prev;
      visibleMetricsForReorder.splice(draggedIndex, 1);

      // Insert at the new position (clamp to valid range)
      const insertIndex = Math.max(
        0,
        Math.min(newIndex, visibleMetricsForReorder.length),
      );
      visibleMetricsForReorder.splice(insertIndex, 0, draggedItem);

      // Update order values for all visible metrics
      visibleMetricsForReorder.forEach((metric, index) => {
        const metricIndex = newMetrics.findIndex((m) => m.id === metric.id);
        if (metricIndex !== -1 && newMetrics[metricIndex]) {
          newMetrics[metricIndex] = {
            ...newMetrics[metricIndex],
            order: index,
          };
        }
      });

      return newMetrics;
    });
  };

  const getTrendIcon = (trend?: string) => {
    if (trend === 'up') return '↗';
    if (trend === 'down') return '↘';
    return '';
  };

  const getTrendColor = (trend?: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-4 p-4">
      {/* Header with Customize Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCustomizationOpen(true)}
          className="gap-2"
        >
          <Settings className="h-4 w-4" />
          Customise
        </Button>
      </div>

      {/* Metrics Grid - Responsive and flexible */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {visibleMetrics.map((metric) => (
          <Card
            key={metric.id}
            className="hover:shadow-md transition-shadow py-2"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-600 leading-tight">
                  {metric.title}
                </h3>
                {metric.trend && (
                  <span className={`text-xs ${getTrendColor(metric.trend)}`}>
                    {getTrendIcon(metric.trend)}
                  </span>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-gray-900">
                  {metric.value}
                </p>
                {metric.trendValue && (
                  <p className={`text-xs ${getTrendColor(metric.trend)}`}>
                    {metric.trendValue}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Customization Dialog */}
      <MetricCustomizationDialog
        isOpen={isCustomizationOpen}
        onClose={() => setIsCustomizationOpen(false)}
        metrics={metrics}
        onMetricToggle={handleMetricToggle}
        onReorder={handleReorder}
      />
    </div>
  );
}
