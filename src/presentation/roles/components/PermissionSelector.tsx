import type { Permission } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from 'shared/components/molecules/MultiSelect';

interface PermissionSelectorProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export default function PermissionSelector({
  values = [],
  onValuesChange
}: PermissionSelectorProps) {
  const { data: permissions, isFetching } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const res = await fetch('/api/permissions');
      return res.json();
    },
    initialData: []
  });

  return (
    <MultiSelector
      options={permissions.map((permission: Permission) => ({
        value: permission.id,
        label: permission.name
      }))}
      values={values}
      onValuesChange={onValuesChange}
      loop
      loading={isFetching}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder='Select permissions' />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {permissions.map((permission: Permission) => (
            <MultiSelectorItem key={permission.id} value={permission.id}>
              {permission.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
