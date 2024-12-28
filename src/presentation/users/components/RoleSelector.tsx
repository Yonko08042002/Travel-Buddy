import type { Role } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from 'shared/components/molecules/MultiSelect';

interface RoleSelectorProps {
  values: string[];
  onValuesChange: (values: string[]) => void;
}

export default function RoleSelector({
  values = [],
  onValuesChange
}: RoleSelectorProps) {
  const { data: roles, isFetching } = useQuery({
    queryKey: ['roles'],
    queryFn: async () => {
      const res = await fetch('/api/roles');
      return res.json();
    },
    initialData: []
  });

  return (
    <MultiSelector
      options={roles.map((role: Role) => ({
        value: role.id,
        label: role.name
      }))}
      values={values}
      onValuesChange={onValuesChange}
      loop
      loading={isFetching}
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder='Select roles' />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {roles.map((role: Role) => (
            <MultiSelectorItem key={role.id} value={role.id}>
              {role.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
}
