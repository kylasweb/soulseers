import React from 'react';
import { useFeatureManagementStore } from '@/store';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const FeatureManager = () => {
  const { modules, updateFeature, updateModule } = useFeatureManagementStore();
  const { toast } = useToast();

  const handleModuleToggle = (moduleId: string, enabled: boolean) => {
    updateModule(moduleId, enabled);
    toast({
      title: `${enabled ? 'Enabled' : 'Disabled'} module`,
      description: `Successfully ${enabled ? 'enabled' : 'disabled'} the module and its features.`,
      variant: enabled ? 'default' : 'destructive',
    });
  };

  const handleFeatureToggle = (moduleId: string, featureId: string, enabled: boolean) => {
    updateFeature(moduleId, featureId, enabled);
    toast({
      title: `${enabled ? 'Enabled' : 'Disabled'} feature`,
      description: `Successfully ${enabled ? 'enabled' : 'disabled'} the feature.`,
      variant: enabled ? 'default' : 'destructive',
    });
  };

  return (
    <section className="space-y-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feature Management</h1>
        <span className="px-4 py-2 border rounded-md text-sm">
          {modules.filter(m => m.enabled).length} Active Modules
        </span>
      </header>
      
      <div className="grid gap-6">
        {modules.map((module) => (
          <Card key={module.id} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold">{module.name}</h2>
                <p className="text-sm text-gray-500">{module.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">
                  {module.features.filter(f => f.enabled).length}/{module.features.length} Features Active
                </span>
                <Switch
                  checked={module.enabled}
                  onCheckedChange={(checked) => handleModuleToggle(module.id, checked)}
                  aria-label={`Toggle ${module.name} module`}
                />
              </div>
            </div>
            
            <div className="space-y-4 pl-4 border-l-2 border-gray-100">
              {module.features.map((feature) => (
                <div key={feature.id} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{feature.name}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                  <Switch
                    checked={feature.enabled && module.enabled}
                    onCheckedChange={(checked) => handleFeatureToggle(module.id, feature.id, checked)}
                    disabled={!module.enabled}
                    aria-label={`Toggle ${feature.name} feature`}
                  />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureManager; 