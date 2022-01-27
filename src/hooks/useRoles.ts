import useSdk from './useSdk';

export const useRoles = () => {
  const { masterSdk } = useSdk();
  const module = masterSdk.getBundleDropModule(
    process.env.NEXT_PUBLIC_BUNDLE_DROP_ADDRESS
  );

  const getAllRoles = async () => {
    const roles = await module.getAllRoleMembers();
    console.log(roles);
    return roles;
  };

  const addMinter = async (address: string) => {
    await module.grantRole('minter', address);
  };

  const removeMinter = async (address: string) => {
    await module.revokeRole('minter', address);
  };

  return { getAllRoles, addMinter, removeMinter };
};
