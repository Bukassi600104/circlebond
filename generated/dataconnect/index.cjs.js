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
  return executeQuery(getCurrentUserRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getRecentAbuseAttemptsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecentAbuseAttempts', inputVars);
}
getRecentAbuseAttemptsRef.operationName = 'GetRecentAbuseAttempts';
exports.getRecentAbuseAttemptsRef = getRecentAbuseAttemptsRef;

exports.getRecentAbuseAttempts = function getRecentAbuseAttempts(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRecentAbuseAttemptsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const recordAbuseAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordAbuseAttempt', inputVars);
}
recordAbuseAttemptRef.operationName = 'RecordAbuseAttempt';
exports.recordAbuseAttemptRef = recordAbuseAttemptRef;

exports.recordAbuseAttempt = function recordAbuseAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordAbuseAttemptRef(dcInstance, inputVars));
}
;

const getConsumedAuthChallengeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetConsumedAuthChallenge', inputVars);
}
getConsumedAuthChallengeRef.operationName = 'GetConsumedAuthChallenge';
exports.getConsumedAuthChallengeRef = getConsumedAuthChallengeRef;

exports.getConsumedAuthChallenge = function getConsumedAuthChallenge(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getConsumedAuthChallengeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const consumeAuthChallengeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ConsumeAuthChallenge', inputVars);
}
consumeAuthChallengeRef.operationName = 'ConsumeAuthChallenge';
exports.consumeAuthChallengeRef = consumeAuthChallengeRef;

exports.consumeAuthChallenge = function consumeAuthChallenge(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(consumeAuthChallengeRef(dcInstance, inputVars));
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
  return executeQuery(getDashboardCirclesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getCircleEngineRecordRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCircleLifecycleSummaryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleLifecycleSummary', inputVars);
}
getCircleLifecycleSummaryRef.operationName = 'GetCircleLifecycleSummary';
exports.getCircleLifecycleSummaryRef = getCircleLifecycleSummaryRef;

exports.getCircleLifecycleSummary = function getCircleLifecycleSummary(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleLifecycleSummaryRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(findUserByEmailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getGiftCircleDetailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getCircleAuditEntriesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const createModelPricedCircleDraftRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateModelPricedCircleDraft', inputVars);
}
createModelPricedCircleDraftRef.operationName = 'CreateModelPricedCircleDraft';
exports.createModelPricedCircleDraftRef = createModelPricedCircleDraftRef;

exports.createModelPricedCircleDraft = function createModelPricedCircleDraft(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createModelPricedCircleDraftRef(dcInstance, inputVars));
}
;

const getCreatorTrialUsageRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCreatorTrialUsage', inputVars);
}
getCreatorTrialUsageRef.operationName = 'GetCreatorTrialUsage';
exports.getCreatorTrialUsageRef = getCreatorTrialUsageRef;

exports.getCreatorTrialUsage = function getCreatorTrialUsage(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCreatorTrialUsageRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const claimTrialAndPublishCircleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ClaimTrialAndPublishCircle', inputVars);
}
claimTrialAndPublishCircleRef.operationName = 'ClaimTrialAndPublishCircle';
exports.claimTrialAndPublishCircleRef = claimTrialAndPublishCircleRef;

exports.claimTrialAndPublishCircle = function claimTrialAndPublishCircle(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(claimTrialAndPublishCircleRef(dcInstance, inputVars));
}
;

const getCirclePricingStateRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCirclePricingState', inputVars);
}
getCirclePricingStateRef.operationName = 'GetCirclePricingState';
exports.getCirclePricingStateRef = getCirclePricingStateRef;

exports.getCirclePricingState = function getCirclePricingState(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCirclePricingStateRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createCircleActivationAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCircleActivationAttempt', inputVars);
}
createCircleActivationAttemptRef.operationName = 'CreateCircleActivationAttempt';
exports.createCircleActivationAttemptRef = createCircleActivationAttemptRef;

exports.createCircleActivationAttempt = function createCircleActivationAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCircleActivationAttemptRef(dcInstance, inputVars));
}
;

const failCircleActivationAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'FailCircleActivationAttempt', inputVars);
}
failCircleActivationAttemptRef.operationName = 'FailCircleActivationAttempt';
exports.failCircleActivationAttemptRef = failCircleActivationAttemptRef;

exports.failCircleActivationAttempt = function failCircleActivationAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(failCircleActivationAttemptRef(dcInstance, inputVars));
}
;

const completePaidCircleActivationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompletePaidCircleActivation', inputVars);
}
completePaidCircleActivationRef.operationName = 'CompletePaidCircleActivation';
exports.completePaidCircleActivationRef = completePaidCircleActivationRef;

exports.completePaidCircleActivation = function completePaidCircleActivation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(completePaidCircleActivationRef(dcInstance, inputVars));
}
;

const completeCirclePlanUpgradeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteCirclePlanUpgrade', inputVars);
}
completeCirclePlanUpgradeRef.operationName = 'CompleteCirclePlanUpgrade';
exports.completeCirclePlanUpgradeRef = completeCirclePlanUpgradeRef;

exports.completeCirclePlanUpgrade = function completeCirclePlanUpgrade(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(completeCirclePlanUpgradeRef(dcInstance, inputVars));
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

const updateModelPricedCircleConfigurationWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateModelPricedCircleConfigurationWithAudit', inputVars);
}
updateModelPricedCircleConfigurationWithAuditRef.operationName = 'UpdateModelPricedCircleConfigurationWithAudit';
exports.updateModelPricedCircleConfigurationWithAuditRef = updateModelPricedCircleConfigurationWithAuditRef;

exports.updateModelPricedCircleConfigurationWithAudit = function updateModelPricedCircleConfigurationWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateModelPricedCircleConfigurationWithAuditRef(dcInstance, inputVars));
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

const setCircleCompletionTypeWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetCircleCompletionTypeWithAudit', inputVars);
}
setCircleCompletionTypeWithAuditRef.operationName = 'SetCircleCompletionTypeWithAudit';
exports.setCircleCompletionTypeWithAuditRef = setCircleCompletionTypeWithAuditRef;

exports.setCircleCompletionTypeWithAudit = function setCircleCompletionTypeWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setCircleCompletionTypeWithAuditRef(dcInstance, inputVars));
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
  return executeQuery(getAsoEbiCircleDetailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getSupportCircleDetailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getInvitationByTokenHashRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getCircleInvitationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getInvitationAcceptancesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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
  return executeQuery(getContributionWorkspaceRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
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

const getCircleCommunicationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleCommunication', inputVars);
}
getCircleCommunicationRef.operationName = 'GetCircleCommunication';
exports.getCircleCommunicationRef = getCircleCommunicationRef;

exports.getCircleCommunication = function getCircleCommunication(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleCommunicationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getRecentCommentsByAuthorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecentCommentsByAuthor', inputVars);
}
getRecentCommentsByAuthorRef.operationName = 'GetRecentCommentsByAuthor';
exports.getRecentCommentsByAuthorRef = getRecentCommentsByAuthorRef;

exports.getRecentCommentsByAuthor = function getRecentCommentsByAuthor(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRecentCommentsByAuthorRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOpenCommentReportsByReporterRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOpenCommentReportsByReporter', inputVars);
}
getOpenCommentReportsByReporterRef.operationName = 'GetOpenCommentReportsByReporter';
exports.getOpenCommentReportsByReporterRef = getOpenCommentReportsByReporterRef;

exports.getOpenCommentReportsByReporter = function getOpenCommentReportsByReporter(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOpenCommentReportsByReporterRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getActivityLogsForCirclesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetActivityLogsForCircles', inputVars);
}
getActivityLogsForCirclesRef.operationName = 'GetActivityLogsForCircles';
exports.getActivityLogsForCirclesRef = getActivityLogsForCirclesRef;

exports.getActivityLogsForCircles = function getActivityLogsForCircles(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getActivityLogsForCirclesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createAnnouncementWithActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateAnnouncementWithActivity', inputVars);
}
createAnnouncementWithActivityRef.operationName = 'CreateAnnouncementWithActivity';
exports.createAnnouncementWithActivityRef = createAnnouncementWithActivityRef;

exports.createAnnouncementWithActivity = function createAnnouncementWithActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createAnnouncementWithActivityRef(dcInstance, inputVars));
}
;

const updateAnnouncementWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateAnnouncementWithAudit', inputVars);
}
updateAnnouncementWithAuditRef.operationName = 'UpdateAnnouncementWithAudit';
exports.updateAnnouncementWithAuditRef = updateAnnouncementWithAuditRef;

exports.updateAnnouncementWithAudit = function updateAnnouncementWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateAnnouncementWithAuditRef(dcInstance, inputVars));
}
;

const deleteAnnouncementWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteAnnouncementWithAudit', inputVars);
}
deleteAnnouncementWithAuditRef.operationName = 'DeleteAnnouncementWithAudit';
exports.deleteAnnouncementWithAuditRef = deleteAnnouncementWithAuditRef;

exports.deleteAnnouncementWithAudit = function deleteAnnouncementWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteAnnouncementWithAuditRef(dcInstance, inputVars));
}
;

const setCircleCommentsWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetCircleCommentsWithAudit', inputVars);
}
setCircleCommentsWithAuditRef.operationName = 'SetCircleCommentsWithAudit';
exports.setCircleCommentsWithAuditRef = setCircleCommentsWithAuditRef;

exports.setCircleCommentsWithAudit = function setCircleCommentsWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setCircleCommentsWithAuditRef(dcInstance, inputVars));
}
;

const createCommentWithActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateCommentWithActivity', inputVars);
}
createCommentWithActivityRef.operationName = 'CreateCommentWithActivity';
exports.createCommentWithActivityRef = createCommentWithActivityRef;

exports.createCommentWithActivity = function createCommentWithActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createCommentWithActivityRef(dcInstance, inputVars));
}
;

const deleteOwnCommentWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DeleteOwnCommentWithAudit', inputVars);
}
deleteOwnCommentWithAuditRef.operationName = 'DeleteOwnCommentWithAudit';
exports.deleteOwnCommentWithAuditRef = deleteOwnCommentWithAuditRef;

exports.deleteOwnCommentWithAudit = function deleteOwnCommentWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(deleteOwnCommentWithAuditRef(dcInstance, inputVars));
}
;

const moderateCommentWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ModerateCommentWithAudit', inputVars);
}
moderateCommentWithAuditRef.operationName = 'ModerateCommentWithAudit';
exports.moderateCommentWithAuditRef = moderateCommentWithAuditRef;

exports.moderateCommentWithAudit = function moderateCommentWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(moderateCommentWithAuditRef(dcInstance, inputVars));
}
;

const reportCommentWithAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ReportCommentWithAudit', inputVars);
}
reportCommentWithAuditRef.operationName = 'ReportCommentWithAudit';
exports.reportCommentWithAuditRef = reportCommentWithAuditRef;

exports.reportCommentWithAudit = function reportCommentWithAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(reportCommentWithAuditRef(dcInstance, inputVars));
}
;

const recordSystemActivityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordSystemActivity', inputVars);
}
recordSystemActivityRef.operationName = 'RecordSystemActivity';
exports.recordSystemActivityRef = recordSystemActivityRef;

exports.recordSystemActivity = function recordSystemActivity(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordSystemActivityRef(dcInstance, inputVars));
}
;

const getUserNotificationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserNotifications', inputVars);
}
getUserNotificationsRef.operationName = 'GetUserNotifications';
exports.getUserNotificationsRef = getUserNotificationsRef;

exports.getUserNotifications = function getUserNotifications(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserNotificationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getNotificationContextRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNotificationContext', inputVars);
}
getNotificationContextRef.operationName = 'GetNotificationContext';
exports.getNotificationContextRef = getNotificationContextRef;

exports.getNotificationContext = function getNotificationContext(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNotificationContextRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getNotificationDedupeRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetNotificationDedupe', inputVars);
}
getNotificationDedupeRef.operationName = 'GetNotificationDedupe';
exports.getNotificationDedupeRef = getNotificationDedupeRef;

exports.getNotificationDedupe = function getNotificationDedupe(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getNotificationDedupeRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getRecentReminderNotificationsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRecentReminderNotifications', inputVars);
}
getRecentReminderNotificationsRef.operationName = 'GetRecentReminderNotifications';
exports.getRecentReminderNotificationsRef = getRecentReminderNotificationsRef;

exports.getRecentReminderNotifications = function getRecentReminderNotifications(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRecentReminderNotificationsRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const findNotificationRecipientByEmailRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'FindNotificationRecipientByEmail', inputVars);
}
findNotificationRecipientByEmailRef.operationName = 'FindNotificationRecipientByEmail';
exports.findNotificationRecipientByEmailRef = findNotificationRecipientByEmailRef;

exports.findNotificationRecipientByEmail = function findNotificationRecipientByEmail(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(findNotificationRecipientByEmailRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getDeadlineNotificationCandidatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetDeadlineNotificationCandidates', inputVars);
}
getDeadlineNotificationCandidatesRef.operationName = 'GetDeadlineNotificationCandidates';
exports.getDeadlineNotificationCandidatesRef = getDeadlineNotificationCandidatesRef;

exports.getDeadlineNotificationCandidates = function getDeadlineNotificationCandidates(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getDeadlineNotificationCandidatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserDeadlineNotificationCandidatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserDeadlineNotificationCandidates', inputVars);
}
getUserDeadlineNotificationCandidatesRef.operationName = 'GetUserDeadlineNotificationCandidates';
exports.getUserDeadlineNotificationCandidatesRef = getUserDeadlineNotificationCandidatesRef;

exports.getUserDeadlineNotificationCandidates = function getUserDeadlineNotificationCandidates(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserDeadlineNotificationCandidatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createNotificationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateNotification', inputVars);
}
createNotificationRef.operationName = 'CreateNotification';
exports.createNotificationRef = createNotificationRef;

exports.createNotification = function createNotification(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createNotificationRef(dcInstance, inputVars));
}
;

const markNotificationReadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkNotificationRead', inputVars);
}
markNotificationReadRef.operationName = 'MarkNotificationRead';
exports.markNotificationReadRef = markNotificationReadRef;

exports.markNotificationRead = function markNotificationRead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markNotificationReadRef(dcInstance, inputVars));
}
;

const dismissNotificationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DismissNotification', inputVars);
}
dismissNotificationRef.operationName = 'DismissNotification';
exports.dismissNotificationRef = dismissNotificationRef;

exports.dismissNotification = function dismissNotification(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(dismissNotificationRef(dcInstance, inputVars));
}
;

const markAllNotificationsReadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'MarkAllNotificationsRead', inputVars);
}
markAllNotificationsReadRef.operationName = 'MarkAllNotificationsRead';
exports.markAllNotificationsReadRef = markAllNotificationsReadRef;

exports.markAllNotificationsRead = function markAllNotificationsRead(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(markAllNotificationsReadRef(dcInstance, inputVars));
}
;

const updateNotificationPreferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateNotificationPreferences', inputVars);
}
updateNotificationPreferencesRef.operationName = 'UpdateNotificationPreferences';
exports.updateNotificationPreferencesRef = updateNotificationPreferencesRef;

exports.updateNotificationPreferences = function updateNotificationPreferences(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(updateNotificationPreferencesRef(dcInstance, inputVars));
}
;

const setCircleNotificationMuteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SetCircleNotificationMute', inputVars);
}
setCircleNotificationMuteRef.operationName = 'SetCircleNotificationMute';
exports.setCircleNotificationMuteRef = setCircleNotificationMuteRef;

exports.setCircleNotificationMute = function setCircleNotificationMute(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(setCircleNotificationMuteRef(dcInstance, inputVars));
}
;

const createEmailDeliveryRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateEmailDelivery', inputVars);
}
createEmailDeliveryRef.operationName = 'CreateEmailDelivery';
exports.createEmailDeliveryRef = createEmailDeliveryRef;

exports.createEmailDelivery = function createEmailDelivery(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createEmailDeliveryRef(dcInstance, inputVars));
}
;

const getRetentionCandidatesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRetentionCandidates', inputVars);
}
getRetentionCandidatesRef.operationName = 'GetRetentionCandidates';
exports.getRetentionCandidatesRef = getRetentionCandidatesRef;

exports.getRetentionCandidates = function getRetentionCandidates(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getRetentionCandidatesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getCircleRetentionPayloadRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetCircleRetentionPayload', inputVars);
}
getCircleRetentionPayloadRef.operationName = 'GetCircleRetentionPayload';
exports.getCircleRetentionPayloadRef = getCircleRetentionPayloadRef;

exports.getCircleRetentionPayload = function getCircleRetentionPayload(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getCircleRetentionPayloadRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getStoragePathReferencesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetStoragePathReferences', inputVars);
}
getStoragePathReferencesRef.operationName = 'GetStoragePathReferences';
exports.getStoragePathReferencesRef = getStoragePathReferencesRef;

exports.getStoragePathReferences = function getStoragePathReferences(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getStoragePathReferencesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const createRetentionPurgeAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateRetentionPurgeAttempt', inputVars);
}
createRetentionPurgeAttemptRef.operationName = 'CreateRetentionPurgeAttempt';
exports.createRetentionPurgeAttemptRef = createRetentionPurgeAttemptRef;

exports.createRetentionPurgeAttempt = function createRetentionPurgeAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(createRetentionPurgeAttemptRef(dcInstance, inputVars));
}
;

const completeRetentionPurgeAttemptRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CompleteRetentionPurgeAttempt', inputVars);
}
completeRetentionPurgeAttemptRef.operationName = 'CompleteRetentionPurgeAttempt';
exports.completeRetentionPurgeAttemptRef = completeRetentionPurgeAttemptRef;

exports.completeRetentionPurgeAttempt = function completeRetentionPurgeAttempt(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(completeRetentionPurgeAttemptRef(dcInstance, inputVars));
}
;

const purgeInvitationAcceptancesRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PurgeInvitationAcceptances', inputVars);
}
purgeInvitationAcceptancesRef.operationName = 'PurgeInvitationAcceptances';
exports.purgeInvitationAcceptancesRef = purgeInvitationAcceptancesRef;

exports.purgeInvitationAcceptances = function purgeInvitationAcceptances(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(purgeInvitationAcceptancesRef(dcInstance, inputVars));
}
;

const purgeCircleSensitiveDataRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'PurgeCircleSensitiveData', inputVars);
}
purgeCircleSensitiveDataRef.operationName = 'PurgeCircleSensitiveData';
exports.purgeCircleSensitiveDataRef = purgeCircleSensitiveDataRef;

exports.purgeCircleSensitiveData = function purgeCircleSensitiveData(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(purgeCircleSensitiveDataRef(dcInstance, inputVars));
}
;

const getOwnerAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerAdministrator', inputVars);
}
getOwnerAdministratorRef.operationName = 'GetOwnerAdministrator';
exports.getOwnerAdministratorRef = getOwnerAdministratorRef;

exports.getOwnerAdministrator = function getOwnerAdministrator(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOwnerAdministratorRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getUserAccountStatusRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserAccountStatus', inputVars);
}
getUserAccountStatusRef.operationName = 'GetUserAccountStatus';
exports.getUserAccountStatusRef = getUserAccountStatusRef;

exports.getUserAccountStatus = function getUserAccountStatus(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getUserAccountStatusRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOwnerPlatformOverviewRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerPlatformOverview');
}
getOwnerPlatformOverviewRef.operationName = 'GetOwnerPlatformOverview';
exports.getOwnerPlatformOverviewRef = getOwnerPlatformOverviewRef;

exports.getOwnerPlatformOverview = function getOwnerPlatformOverview(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getOwnerPlatformOverviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOwnerReportReviewRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerReportReview', inputVars);
}
getOwnerReportReviewRef.operationName = 'GetOwnerReportReview';
exports.getOwnerReportReviewRef = getOwnerReportReviewRef;

exports.getOwnerReportReview = function getOwnerReportReview(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOwnerReportReviewRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOwnerUserByIdentifierRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerUserByIdentifier', inputVars);
}
getOwnerUserByIdentifierRef.operationName = 'GetOwnerUserByIdentifier';
exports.getOwnerUserByIdentifierRef = getOwnerUserByIdentifierRef;

exports.getOwnerUserByIdentifier = function getOwnerUserByIdentifier(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOwnerUserByIdentifierRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getOwnerOperationalExportRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerOperationalExport');
}
getOwnerOperationalExportRef.operationName = 'GetOwnerOperationalExport';
exports.getOwnerOperationalExportRef = getOwnerOperationalExportRef;

exports.getOwnerOperationalExport = function getOwnerOperationalExport(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(getOwnerOperationalExportRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const recordOperationalEventRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordOperationalEvent', inputVars);
}
recordOperationalEventRef.operationName = 'RecordOperationalEvent';
exports.recordOperationalEventRef = recordOperationalEventRef;

exports.recordOperationalEvent = function recordOperationalEvent(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordOperationalEventRef(dcInstance, inputVars));
}
;

const recordOwnerAdminAuditRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RecordOwnerAdminAudit', inputVars);
}
recordOwnerAdminAuditRef.operationName = 'RecordOwnerAdminAudit';
exports.recordOwnerAdminAuditRef = recordOwnerAdminAuditRef;

exports.recordOwnerAdminAudit = function recordOwnerAdminAudit(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(recordOwnerAdminAuditRef(dcInstance, inputVars));
}
;

const resolveOwnerCommentReportRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ResolveOwnerCommentReport', inputVars);
}
resolveOwnerCommentReportRef.operationName = 'ResolveOwnerCommentReport';
exports.resolveOwnerCommentReportRef = resolveOwnerCommentReportRef;

exports.resolveOwnerCommentReport = function resolveOwnerCommentReport(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(resolveOwnerCommentReportRef(dcInstance, inputVars));
}
;

const dismissOwnerCommentReportRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'DismissOwnerCommentReport', inputVars);
}
dismissOwnerCommentReportRef.operationName = 'DismissOwnerCommentReport';
exports.dismissOwnerCommentReportRef = dismissOwnerCommentReportRef;

exports.dismissOwnerCommentReport = function dismissOwnerCommentReport(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(dismissOwnerCommentReportRef(dcInstance, inputVars));
}
;

const suspendOwnerTargetUserRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SuspendOwnerTargetUser', inputVars);
}
suspendOwnerTargetUserRef.operationName = 'SuspendOwnerTargetUser';
exports.suspendOwnerTargetUserRef = suspendOwnerTargetUserRef;

exports.suspendOwnerTargetUser = function suspendOwnerTargetUser(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(suspendOwnerTargetUserRef(dcInstance, inputVars));
}
;

const revokeCompromisedInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RevokeCompromisedInvitation', inputVars);
}
revokeCompromisedInvitationRef.operationName = 'RevokeCompromisedInvitation';
exports.revokeCompromisedInvitationRef = revokeCompromisedInvitationRef;

exports.revokeCompromisedInvitation = function revokeCompromisedInvitation(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(revokeCompromisedInvitationRef(dcInstance, inputVars));
}
;

const getOwnerInvitationRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetOwnerInvitation', inputVars);
}
getOwnerInvitationRef.operationName = 'GetOwnerInvitation';
exports.getOwnerInvitationRef = getOwnerInvitationRef;

exports.getOwnerInvitation = function getOwnerInvitation(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getOwnerInvitationRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const provisionOwnerAccountRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionOwnerAccount', inputVars);
}
provisionOwnerAccountRef.operationName = 'ProvisionOwnerAccount';
exports.provisionOwnerAccountRef = provisionOwnerAccountRef;

exports.provisionOwnerAccount = function provisionOwnerAccount(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionOwnerAccountRef(dcInstance, inputVars));
}
;

const provisionOwnerAdministratorRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'ProvisionOwnerAdministrator', inputVars);
}
provisionOwnerAdministratorRef.operationName = 'ProvisionOwnerAdministrator';
exports.provisionOwnerAdministratorRef = provisionOwnerAdministratorRef;

exports.provisionOwnerAdministrator = function provisionOwnerAdministrator(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(provisionOwnerAdministratorRef(dcInstance, inputVars));
}
;
