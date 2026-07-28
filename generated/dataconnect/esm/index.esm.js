import { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'bondcircle',
  service: 'bondcircle-service',
  location: 'europe-west2'
};
export const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';

export function getCurrentUser(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const upsertCurrentUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCurrentUser', inputVars);
}
upsertCurrentUserRef.operationName = 'UpsertCurrentUser';

export function upsertCurrentUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCurrentUserRef(dcInstance, inputVars));
}

export const getDashboardCirclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardCircles');
}
getDashboardCirclesRef.operationName = 'GetDashboardCircles';

export function getDashboardCircles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDashboardCirclesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getCircleEngineRecordRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleEngineRecord', inputVars);
}
getCircleEngineRecordRef.operationName = 'GetCircleEngineRecord';

export function getCircleEngineRecord(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleEngineRecordRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const findUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'FindUserByEmail', inputVars);
}
findUserByEmailRef.operationName = 'FindUserByEmail';

export function findUserByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(findUserByEmailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getGiftCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGiftCircleDetail', inputVars);
}
getGiftCircleDetailRef.operationName = 'GetGiftCircleDetail';

export function getGiftCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGiftCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getCircleAuditEntriesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleAuditEntries', inputVars);
}
getCircleAuditEntriesRef.operationName = 'GetCircleAuditEntries';

export function getCircleAuditEntries(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleAuditEntriesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const createCircleDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCircleDraft', inputVars);
}
createCircleDraftRef.operationName = 'CreateCircleDraft';

export function createCircleDraft(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCircleDraftRef(dcInstance, inputVars));
}

export const updateCircleConfigurationWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCircleConfigurationWithAudit', inputVars);
}
updateCircleConfigurationWithAuditRef.operationName = 'UpdateCircleConfigurationWithAudit';

export function updateCircleConfigurationWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCircleConfigurationWithAuditRef(dcInstance, inputVars));
}

export const transitionCircleWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TransitionCircleWithAudit', inputVars);
}
transitionCircleWithAuditRef.operationName = 'TransitionCircleWithAudit';

export function transitionCircleWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(transitionCircleWithAuditRef(dcInstance, inputVars));
}

export const addCircleMemberWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCircleMemberWithAudit', inputVars);
}
addCircleMemberWithAuditRef.operationName = 'AddCircleMemberWithAudit';

export function addCircleMemberWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addCircleMemberWithAuditRef(dcInstance, inputVars));
}

export const configureGiftCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureGiftCircle', inputVars);
}
configureGiftCircleRef.operationName = 'ConfigureGiftCircle';

export function configureGiftCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureGiftCircleRef(dcInstance, inputVars));
}

export const setGiftMemberAllocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetGiftMemberAllocation', inputVars);
}
setGiftMemberAllocationRef.operationName = 'SetGiftMemberAllocation';

export function setGiftMemberAllocation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setGiftMemberAllocationRef(dcInstance, inputVars));
}

export const getAsoEbiCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAsoEbiCircleDetail', inputVars);
}
getAsoEbiCircleDetailRef.operationName = 'GetAsoEbiCircleDetail';

export function getAsoEbiCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAsoEbiCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const configureAsoEbiCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureAsoEbiCircle', inputVars);
}
configureAsoEbiCircleRef.operationName = 'ConfigureAsoEbiCircle';

export function configureAsoEbiCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureAsoEbiCircleRef(dcInstance, inputVars));
}

export const createAsoEbiTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAsoEbiTier', inputVars);
}
createAsoEbiTierRef.operationName = 'CreateAsoEbiTier';

export function createAsoEbiTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAsoEbiTierRef(dcInstance, inputVars));
}

export const selectAsoEbiTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SelectAsoEbiTier', inputVars);
}
selectAsoEbiTierRef.operationName = 'SelectAsoEbiTier';

export function selectAsoEbiTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(selectAsoEbiTierRef(dcInstance, inputVars));
}

export const updateAsoEbiFulfilmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAsoEbiFulfilment', inputVars);
}
updateAsoEbiFulfilmentRef.operationName = 'UpdateAsoEbiFulfilment';

export function updateAsoEbiFulfilment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAsoEbiFulfilmentRef(dcInstance, inputVars));
}

export const getSupportCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSupportCircleDetail', inputVars);
}
getSupportCircleDetailRef.operationName = 'GetSupportCircleDetail';

export function getSupportCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSupportCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const configureSupportCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureSupportCircle', inputVars);
}
configureSupportCircleRef.operationName = 'ConfigureSupportCircle';

export function configureSupportCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureSupportCircleRef(dcInstance, inputVars));
}

export const recordSupportPledgeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordSupportPledge', inputVars);
}
recordSupportPledgeRef.operationName = 'RecordSupportPledge';

export function recordSupportPledge(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordSupportPledgeRef(dcInstance, inputVars));
}

export const setSupportMemberAllocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetSupportMemberAllocation', inputVars);
}
setSupportMemberAllocationRef.operationName = 'SetSupportMemberAllocation';

export function setSupportMemberAllocation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setSupportMemberAllocationRef(dcInstance, inputVars));
}

export const createSupportUpdateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupportUpdate', inputVars);
}
createSupportUpdateRef.operationName = 'CreateSupportUpdate';

export function createSupportUpdate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSupportUpdateRef(dcInstance, inputVars));
}

export const setSupportCompletionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetSupportCompletionType', inputVars);
}
setSupportCompletionTypeRef.operationName = 'SetSupportCompletionType';

export function setSupportCompletionType(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setSupportCompletionTypeRef(dcInstance, inputVars));
}

export const getInvitationByTokenHashRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitationByTokenHash', inputVars);
}
getInvitationByTokenHashRef.operationName = 'GetInvitationByTokenHash';

export function getInvitationByTokenHash(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInvitationByTokenHashRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getCircleInvitationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleInvitations', inputVars);
}
getCircleInvitationsRef.operationName = 'GetCircleInvitations';

export function getCircleInvitations(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleInvitationsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getInvitationAcceptancesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitationAcceptances', inputVars);
}
getInvitationAcceptancesRef.operationName = 'GetInvitationAcceptances';

export function getInvitationAcceptances(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInvitationAcceptancesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const createInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvitation', inputVars);
}
createInvitationRef.operationName = 'CreateInvitation';

export function createInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvitationRef(dcInstance, inputVars));
}

export const updateInvitationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvitationState', inputVars);
}
updateInvitationStateRef.operationName = 'UpdateInvitationState';

export function updateInvitationState(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvitationStateRef(dcInstance, inputVars));
}

export const acceptInvitationWithMembershipRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptInvitationWithMembership', inputVars);
}
acceptInvitationWithMembershipRef.operationName = 'AcceptInvitationWithMembership';

export function acceptInvitationWithMembership(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(acceptInvitationWithMembershipRef(dcInstance, inputVars));
}

export const requestInvitationApprovalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestInvitationApproval', inputVars);
}
requestInvitationApprovalRef.operationName = 'RequestInvitationApproval';

export function requestInvitationApproval(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requestInvitationApprovalRef(dcInstance, inputVars));
}

export const getContributionWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetContributionWorkspace', inputVars);
}
getContributionWorkspaceRef.operationName = 'GetContributionWorkspace';

export function getContributionWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getContributionWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const submitReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitReceiptWithAudit', inputVars);
}
submitReceiptWithAuditRef.operationName = 'SubmitReceiptWithAudit';

export function submitReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitReceiptWithAuditRef(dcInstance, inputVars));
}

export const replaceReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReplaceReceiptWithAudit', inputVars);
}
replaceReceiptWithAuditRef.operationName = 'ReplaceReceiptWithAudit';

export function replaceReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(replaceReceiptWithAuditRef(dcInstance, inputVars));
}

export const reviewReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReviewReceiptWithAudit', inputVars);
}
reviewReceiptWithAuditRef.operationName = 'ReviewReceiptWithAudit';

export function reviewReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(reviewReceiptWithAuditRef(dcInstance, inputVars));
}

export const approveInvitationMembershipRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApproveInvitationMembership', inputVars);
}
approveInvitationMembershipRef.operationName = 'ApproveInvitationMembership';

export function approveInvitationMembership(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(approveInvitationMembershipRef(dcInstance, inputVars));
}

export const declineInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineInvitation', inputVars);
}
declineInvitationRef.operationName = 'DeclineInvitation';

export function declineInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(declineInvitationRef(dcInstance, inputVars));
}

export const requestReplacementInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestReplacementInvitation', inputVars);
}
requestReplacementInvitationRef.operationName = 'RequestReplacementInvitation';

export function requestReplacementInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requestReplacementInvitationRef(dcInstance, inputVars));
}

