export interface PatchUserRequest {
  id: string;
  marketingPreferences: MarketingPreferencesModel;
}

export interface MarketingPreferencesModel {
  email: boolean;
  phone: boolean;
  sms: boolean;
}
