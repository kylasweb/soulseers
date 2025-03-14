
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flag, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSocialManagement } from '@/hooks/use-social-management';
import { formatDistance } from 'date-fns';

const ReportsList: React.FC = () => {
  const { reports } = useSocialManagement();

  if (reports.isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (reports.isError || !reports.data) {
    return (
      <div className="bg-destructive/10 p-4 rounded-md text-destructive mb-4">
        Error loading reports. Please refresh the page.
      </div>
    );
  }

  const newReportsCount = reports.data.filter(report => report.status === 'new').length;

  return (
    <div className="space-y-4">
      {newReportsCount > 0 && (
        <div className="rounded-md bg-amber-50 border border-amber-200 p-4 mb-4">
          <div className="flex items-center">
            <Flag className="h-5 w-5 text-amber-600 mr-2" />
            <p className="text-amber-800 text-sm">
              There are {newReportsCount} reports that require your attention.
            </p>
          </div>
        </div>
      )}
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {reports.data.map((report) => (
              <div key={report.id} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-red-100">
                    <Flag className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="text-sm font-medium">Report #{report.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistance(new Date(report.timestamp), new Date(), { addSuffix: true })}
                        </p>
                      </div>
                      <Badge 
                        className="mt-1 sm:mt-0 w-fit" 
                        variant={report.status === 'new' ? 'destructive' : 'outline'}
                      >
                        {report.status === 'new' ? 'New' : 'Reviewing'}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Reason: {report.reason}</p>
                      <p className="text-sm mt-1">Reported by: {report.reportedBy.name}</p>
                      <p className="text-sm mt-1">Content by: {report.contentAuthor.name}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <Button variant="outline" size="sm">View Content</Button>
                      <Button variant="destructive" size="sm">Take Action</Button>
                      <Button variant="ghost" size="sm">Dismiss</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsList;
