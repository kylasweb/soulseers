
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Flag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const ReportsList: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="rounded-md bg-amber-50 border border-amber-200 p-4 mb-4">
        <div className="flex items-center">
          <Flag className="h-5 w-5 text-amber-600 mr-2" />
          <p className="text-amber-800 text-sm">There are 12 reports that require your attention.</p>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="p-4 hover:bg-accent/50 transition-colors">
                <div className="flex items-start">
                  <div className="p-2 rounded-full bg-red-100">
                    <Flag className="h-4 w-4 text-red-500" />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="text-sm font-medium">Report #{['R-421', 'R-420', 'R-419', 'R-418', 'R-417'][i]}</p>
                        <p className="text-xs text-muted-foreground">{['1 hour ago', '3 hours ago', '1 day ago', '2 days ago', '3 days ago'][i]}</p>
                      </div>
                      <Badge className="mt-1 sm:mt-0 w-fit" variant={i < 3 ? 'destructive' : 'outline'}>
                        {i < 3 ? 'New' : 'Reviewing'}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">Reason: {[
                        'Misleading content',
                        'Inappropriate behavior',
                        'Spam',
                        'Harassment',
                        'False information'
                      ][i]}</p>
                      <p className="text-sm mt-1">Reported by: {[
                        'Michael Brown',
                        'Jessica Taylor',
                        'Thomas Garcia',
                        'Rebecca Jones',
                        'Kevin Lee'
                      ][i]}</p>
                      <p className="text-sm mt-1">Content by: {[
                        'Emma Wilson',
                        'Sarah Lee',
                        'James Smith',
                        'David Chen',
                        'Maria Garcia'
                      ][i]}</p>
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
