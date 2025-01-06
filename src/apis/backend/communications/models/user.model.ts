export interface UserModel {
  id: string;
  email: string;
  marketingPreferences: MarketingPreferencesModel;
}

export interface MarketingPreferencesModel {
  email: boolean;
  phone: boolean;
  sms: boolean;
}
