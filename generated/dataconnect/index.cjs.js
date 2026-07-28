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
