const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'bondcircle',
  service: 'bondcircle-service',
  location: 'europe-west2'
};
exports.connectorConfig = connectorConfig;

const getCurrentUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCurrentUser');
}
getCurrentUserRef.operationName = 'GetCurrentUser';
exports.getCurrentUserRef = getCurrentUserRef;

exports.getCurrentUser = function getCurrentUser(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getCurrentUserRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const upsertCurrentUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertCurrentUser', inputVars);
}
upsertCurrentUserRef.operationName = 'UpsertCurrentUser';
exports.upsertCurrentUserRef = upsertCurrentUserRef;

exports.upsertCurrentUser = function upsertCurrentUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertCurrentUserRef(dcInstance, inputVars));
}
;

const getDashboardCirclesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDashboardCircles');
}
getDashboardCirclesRef.operationName = 'GetDashboardCircles';
exports.getDashboardCirclesRef = getDashboardCirclesRef;

exports.getDashboardCircles = function getDashboardCircles(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getDashboardCirclesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCircleEngineRecordRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleEngineRecord', inputVars);
}
getCircleEngineRecordRef.operationName = 'GetCircleEngineRecord';
exports.getCircleEngineRecordRef = getCircleEngineRecordRef;

exports.getCircleEngineRecord = function getCircleEngineRecord(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleEngineRecordRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const findUserByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'FindUserByEmail', inputVars);
}
findUserByEmailRef.operationName = 'FindUserByEmail';
exports.findUserByEmailRef = findUserByEmailRef;

exports.findUserByEmail = function findUserByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(findUserByEmailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getGiftCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetGiftCircleDetail', inputVars);
}
getGiftCircleDetailRef.operationName = 'GetGiftCircleDetail';
exports.getGiftCircleDetailRef = getGiftCircleDetailRef;

exports.getGiftCircleDetail = function getGiftCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getGiftCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCircleAuditEntriesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleAuditEntries', inputVars);
}
getCircleAuditEntriesRef.operationName = 'GetCircleAuditEntries';
exports.getCircleAuditEntriesRef = getCircleAuditEntriesRef;

exports.getCircleAuditEntries = function getCircleAuditEntries(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleAuditEntriesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createCircleDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCircleDraft', inputVars);
}
createCircleDraftRef.operationName = 'CreateCircleDraft';
exports.createCircleDraftRef = createCircleDraftRef;

exports.createCircleDraft = function createCircleDraft(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCircleDraftRef(dcInstance, inputVars));
}
;

const updateCircleConfigurationWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateCircleConfigurationWithAudit', inputVars);
}
updateCircleConfigurationWithAuditRef.operationName = 'UpdateCircleConfigurationWithAudit';
exports.updateCircleConfigurationWithAuditRef = updateCircleConfigurationWithAuditRef;

exports.updateCircleConfigurationWithAudit = function updateCircleConfigurationWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateCircleConfigurationWithAuditRef(dcInstance, inputVars));
}
;

const transitionCircleWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'TransitionCircleWithAudit', inputVars);
}
transitionCircleWithAuditRef.operationName = 'TransitionCircleWithAudit';
exports.transitionCircleWithAuditRef = transitionCircleWithAuditRef;

exports.transitionCircleWithAudit = function transitionCircleWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(transitionCircleWithAuditRef(dcInstance, inputVars));
}
;

const addCircleMemberWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AddCircleMemberWithAudit', inputVars);
}
addCircleMemberWithAuditRef.operationName = 'AddCircleMemberWithAudit';
exports.addCircleMemberWithAuditRef = addCircleMemberWithAuditRef;

exports.addCircleMemberWithAudit = function addCircleMemberWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(addCircleMemberWithAuditRef(dcInstance, inputVars));
}
;

const configureGiftCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureGiftCircle', inputVars);
}
configureGiftCircleRef.operationName = 'ConfigureGiftCircle';
exports.configureGiftCircleRef = configureGiftCircleRef;

exports.configureGiftCircle = function configureGiftCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureGiftCircleRef(dcInstance, inputVars));
}
;

const setGiftMemberAllocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetGiftMemberAllocation', inputVars);
}
setGiftMemberAllocationRef.operationName = 'SetGiftMemberAllocation';
exports.setGiftMemberAllocationRef = setGiftMemberAllocationRef;

exports.setGiftMemberAllocation = function setGiftMemberAllocation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setGiftMemberAllocationRef(dcInstance, inputVars));
}
;

const getAsoEbiCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetAsoEbiCircleDetail', inputVars);
}
getAsoEbiCircleDetailRef.operationName = 'GetAsoEbiCircleDetail';
exports.getAsoEbiCircleDetailRef = getAsoEbiCircleDetailRef;

exports.getAsoEbiCircleDetail = function getAsoEbiCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getAsoEbiCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const configureAsoEbiCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureAsoEbiCircle', inputVars);
}
configureAsoEbiCircleRef.operationName = 'ConfigureAsoEbiCircle';
exports.configureAsoEbiCircleRef = configureAsoEbiCircleRef;

exports.configureAsoEbiCircle = function configureAsoEbiCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureAsoEbiCircleRef(dcInstance, inputVars));
}
;

const createAsoEbiTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAsoEbiTier', inputVars);
}
createAsoEbiTierRef.operationName = 'CreateAsoEbiTier';
exports.createAsoEbiTierRef = createAsoEbiTierRef;

exports.createAsoEbiTier = function createAsoEbiTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAsoEbiTierRef(dcInstance, inputVars));
}
;

const selectAsoEbiTierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SelectAsoEbiTier', inputVars);
}
selectAsoEbiTierRef.operationName = 'SelectAsoEbiTier';
exports.selectAsoEbiTierRef = selectAsoEbiTierRef;

exports.selectAsoEbiTier = function selectAsoEbiTier(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(selectAsoEbiTierRef(dcInstance, inputVars));
}
;

const updateAsoEbiFulfilmentRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAsoEbiFulfilment', inputVars);
}
updateAsoEbiFulfilmentRef.operationName = 'UpdateAsoEbiFulfilment';
exports.updateAsoEbiFulfilmentRef = updateAsoEbiFulfilmentRef;

exports.updateAsoEbiFulfilment = function updateAsoEbiFulfilment(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAsoEbiFulfilmentRef(dcInstance, inputVars));
}
;

const getSupportCircleDetailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetSupportCircleDetail', inputVars);
}
getSupportCircleDetailRef.operationName = 'GetSupportCircleDetail';
exports.getSupportCircleDetailRef = getSupportCircleDetailRef;

exports.getSupportCircleDetail = function getSupportCircleDetail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getSupportCircleDetailRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const configureSupportCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConfigureSupportCircle', inputVars);
}
configureSupportCircleRef.operationName = 'ConfigureSupportCircle';
exports.configureSupportCircleRef = configureSupportCircleRef;

exports.configureSupportCircle = function configureSupportCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(configureSupportCircleRef(dcInstance, inputVars));
}
;

const recordSupportPledgeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordSupportPledge', inputVars);
}
recordSupportPledgeRef.operationName = 'RecordSupportPledge';
exports.recordSupportPledgeRef = recordSupportPledgeRef;

exports.recordSupportPledge = function recordSupportPledge(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordSupportPledgeRef(dcInstance, inputVars));
}
;

const setSupportMemberAllocationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetSupportMemberAllocation', inputVars);
}
setSupportMemberAllocationRef.operationName = 'SetSupportMemberAllocation';
exports.setSupportMemberAllocationRef = setSupportMemberAllocationRef;

exports.setSupportMemberAllocation = function setSupportMemberAllocation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setSupportMemberAllocationRef(dcInstance, inputVars));
}
;

const createSupportUpdateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateSupportUpdate', inputVars);
}
createSupportUpdateRef.operationName = 'CreateSupportUpdate';
exports.createSupportUpdateRef = createSupportUpdateRef;

exports.createSupportUpdate = function createSupportUpdate(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createSupportUpdateRef(dcInstance, inputVars));
}
;

const setSupportCompletionTypeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetSupportCompletionType', inputVars);
}
setSupportCompletionTypeRef.operationName = 'SetSupportCompletionType';
exports.setSupportCompletionTypeRef = setSupportCompletionTypeRef;

exports.setSupportCompletionType = function setSupportCompletionType(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setSupportCompletionTypeRef(dcInstance, inputVars));
}
;

const getInvitationByTokenHashRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitationByTokenHash', inputVars);
}
getInvitationByTokenHashRef.operationName = 'GetInvitationByTokenHash';
exports.getInvitationByTokenHashRef = getInvitationByTokenHashRef;

exports.getInvitationByTokenHash = function getInvitationByTokenHash(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInvitationByTokenHashRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getCircleInvitationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleInvitations', inputVars);
}
getCircleInvitationsRef.operationName = 'GetCircleInvitations';
exports.getCircleInvitationsRef = getCircleInvitationsRef;

exports.getCircleInvitations = function getCircleInvitations(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleInvitationsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getInvitationAcceptancesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetInvitationAcceptances', inputVars);
}
getInvitationAcceptancesRef.operationName = 'GetInvitationAcceptances';
exports.getInvitationAcceptancesRef = getInvitationAcceptancesRef;

exports.getInvitationAcceptances = function getInvitationAcceptances(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getInvitationAcceptancesRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const createInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateInvitation', inputVars);
}
createInvitationRef.operationName = 'CreateInvitation';
exports.createInvitationRef = createInvitationRef;

exports.createInvitation = function createInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createInvitationRef(dcInstance, inputVars));
}
;

const updateInvitationStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateInvitationState', inputVars);
}
updateInvitationStateRef.operationName = 'UpdateInvitationState';
exports.updateInvitationStateRef = updateInvitationStateRef;

exports.updateInvitationState = function updateInvitationState(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateInvitationStateRef(dcInstance, inputVars));
}
;

const acceptInvitationWithMembershipRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'AcceptInvitationWithMembership', inputVars);
}
acceptInvitationWithMembershipRef.operationName = 'AcceptInvitationWithMembership';
exports.acceptInvitationWithMembershipRef = acceptInvitationWithMembershipRef;

exports.acceptInvitationWithMembership = function acceptInvitationWithMembership(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(acceptInvitationWithMembershipRef(dcInstance, inputVars));
}
;

const requestInvitationApprovalRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestInvitationApproval', inputVars);
}
requestInvitationApprovalRef.operationName = 'RequestInvitationApproval';
exports.requestInvitationApprovalRef = requestInvitationApprovalRef;

exports.requestInvitationApproval = function requestInvitationApproval(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requestInvitationApprovalRef(dcInstance, inputVars));
}
;

const getContributionWorkspaceRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetContributionWorkspace', inputVars);
}
getContributionWorkspaceRef.operationName = 'GetContributionWorkspace';
exports.getContributionWorkspaceRef = getContributionWorkspaceRef;

exports.getContributionWorkspace = function getContributionWorkspace(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getContributionWorkspaceRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const submitReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitReceiptWithAudit', inputVars);
}
submitReceiptWithAuditRef.operationName = 'SubmitReceiptWithAudit';
exports.submitReceiptWithAuditRef = submitReceiptWithAuditRef;

exports.submitReceiptWithAudit = function submitReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(submitReceiptWithAuditRef(dcInstance, inputVars));
}
;

const replaceReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReplaceReceiptWithAudit', inputVars);
}
replaceReceiptWithAuditRef.operationName = 'ReplaceReceiptWithAudit';
exports.replaceReceiptWithAuditRef = replaceReceiptWithAuditRef;

exports.replaceReceiptWithAudit = function replaceReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(replaceReceiptWithAuditRef(dcInstance, inputVars));
}
;

const reviewReceiptWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReviewReceiptWithAudit', inputVars);
}
reviewReceiptWithAuditRef.operationName = 'ReviewReceiptWithAudit';
exports.reviewReceiptWithAuditRef = reviewReceiptWithAuditRef;

exports.reviewReceiptWithAudit = function reviewReceiptWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(reviewReceiptWithAuditRef(dcInstance, inputVars));
}
;

const approveInvitationMembershipRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ApproveInvitationMembership', inputVars);
}
approveInvitationMembershipRef.operationName = 'ApproveInvitationMembership';
exports.approveInvitationMembershipRef = approveInvitationMembershipRef;

exports.approveInvitationMembership = function approveInvitationMembership(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(approveInvitationMembershipRef(dcInstance, inputVars));
}
;

const declineInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeclineInvitation', inputVars);
}
declineInvitationRef.operationName = 'DeclineInvitation';
exports.declineInvitationRef = declineInvitationRef;

exports.declineInvitation = function declineInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(declineInvitationRef(dcInstance, inputVars));
}
;

const requestReplacementInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestReplacementInvitation', inputVars);
}
requestReplacementInvitationRef.operationName = 'RequestReplacementInvitation';
exports.requestReplacementInvitationRef = requestReplacementInvitationRef;

exports.requestReplacementInvitation = function requestReplacementInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(requestReplacementInvitationRef(dcInstance, inputVars));
}
;
