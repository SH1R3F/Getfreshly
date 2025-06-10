'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import { Button } from '@repo/ui/components/button';
import { Switch } from '@repo/ui/components/switch';
import { Badge } from '@repo/ui/components/badge';
import { GripVertical } from 'lucide-react';
import { Metric } from './PerformanceDashboard';

interface MetricCustomizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  metrics: Metric[];
  onMetricToggle: (metricId: string) => void;
  onReorder: (draggedId: string, newIndex: number) => void;
}

export default function MetricCustomizationDialog({
  isOpen,
  onClose,
  metrics,
  onMetricToggle,
  onReorder,
}: MetricCustomizationDialogProps) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dropPosition, setDropPosition] = useState<{
    targetId: string;
    position: 'before' | 'after';
  } | null>(null);

  const visibleMetrics = metrics
    .filter((m) => m.isVisible)
    .sort((a, b) => a.order - b.order);
  const hiddenMetrics = metrics
    .filter((m) => !m.isVisible)
    .sort((a, b) => a.title.localeCompare(b.title));
  const visibleCount = visibleMetrics.length;

  const handleDragStart = (e: React.DragEvent, metricId: string) => {
    setDraggedItem(metricId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', metricId);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (draggedItem && draggedItem !== targetId) {
      const rect = e.currentTarget.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const position = e.clientY < midY ? 'before' : 'after';
      setDropPosition({ targetId, position });
    }
  };

  const handleDragLeave = () => {
    setDropPosition(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');

    if (draggedId && draggedId !== targetId && dropPosition) {
      // Find the target index in the visible metrics
      const targetIndex = visibleMetrics.findIndex((m) => m.id === targetId);

      // Calculate the new index based on drop position
      let newIndex: number;
      if (dropPosition.position === 'before') {
        newIndex = targetIndex;
      } else {
        newIndex = targetIndex + 1;
      }

      // Adjust for the fact that we're moving an item that's currently in the list
      const draggedIndex = visibleMetrics.findIndex((m) => m.id === draggedId);
      if (draggedIndex !== -1 && draggedIndex < newIndex) {
        newIndex = newIndex - 1;
      }

      onReorder(draggedId, newIndex);
    }

    setDraggedItem(null);
    setDropPosition(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDropPosition(null);
  };

  const getTrendColor = (trend?: string) => {
    if (trend === 'up') return 'text-green-600';
    if (trend === 'down') return 'text-red-600';
    return 'text-gray-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Metrics</DialogTitle>
          <DialogDescription>
            Choose which metrics to display on your dashboard and arrange them
            in your preferred order.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm font-medium">Currently showing:</span>
            <Badge variant="secondary">{visibleCount} metrics</Badge>
          </div>

          {/* All Metrics Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">All Metrics</h3>
            <p className="text-sm text-gray-600 mb-4">
              Activated metrics appear at the top and can be dragged to reorder.
              Use the switches to show/hide metrics.
            </p>

            <div className="space-y-1">
              {/* Visible/Active Metrics - Draggable */}
              {visibleMetrics.map((metric) => (
                <div key={metric.id}>
                  {/* Drop line - before */}
                  {dropPosition?.targetId === metric.id &&
                    dropPosition.position === 'before' && (
                      <div className="h-0.5 bg-blue-500 rounded-full mx-4 mb-1" />
                    )}

                  <div
                    className={`flex items-center justify-between p-3 border rounded-lg transition-all cursor-move ${
                      draggedItem === metric.id
                        ? 'bg-blue-100 border-blue-300 opacity-50'
                        : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                    }`}
                    draggable
                    onDragStart={(e) => handleDragStart(e, metric.id)}
                    onDragOver={(e) => handleDragOver(e, metric.id)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, metric.id)}
                    onDragEnd={handleDragEnd}
                  >
                    <div className="flex items-center space-x-3 flex-1">
                      <GripVertical className="h-4 w-4 text-blue-600" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {metric.title}
                        </h4>
                        <p className="text-sm text-gray-500">
                          Current value:{' '}
                          <span className="font-medium">{metric.value}</span>
                          {metric.trend && metric.trendValue && (
                            <span
                              className={`ml-2 ${getTrendColor(metric.trend)}`}
                            >
                              ({metric.trendValue})
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked
                        onCheckedChange={() => onMetricToggle(metric.id)}
                      />
                    </div>
                  </div>

                  {/* Drop line - after */}
                  {dropPosition?.targetId === metric.id &&
                    dropPosition.position === 'after' && (
                      <div className="h-0.5 bg-blue-500 rounded-full mx-4 mt-1" />
                    )}
                </div>
              ))}

              {/* Hidden Metrics - Not Draggable */}
              {hiddenMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-4 h-4" />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-500">
                        {metric.title}
                      </h4>
                      <p className="text-sm text-gray-400">
                        Current value:{' '}
                        <span className="font-medium">{metric.value}</span>
                        {metric.trend && metric.trendValue && (
                          <span
                            className={`ml-2 ${getTrendColor(metric.trend)} opacity-70`}
                          >
                            ({metric.trendValue})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="text-xs text-gray-500">
                      Hidden
                    </Badge>
                    <Switch
                      checked={false}
                      onCheckedChange={() => onMetricToggle(metric.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t">
            <p className="text-sm text-gray-500">
              {visibleCount === 0
                ? 'No metrics selected'
                : `${visibleCount} metrics selected`}
            </p>
            <Button onClick={onClose}>Done</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
