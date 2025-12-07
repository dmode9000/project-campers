import { Camper, CamperEquipment, CamperForm } from '@/types/camper';
import {
  TbAirConditioning,
  TbBath,
  TbToolsKitchen2,
  TbDeviceTv,
  TbRadio,
  TbFridge,
  TbMicrowave,
  TbFlame,
  TbDroplet,
  TbCamper,
  TbCaravan,
  TbBus,
} from 'react-icons/tb';

export const CAMPER_FORMS: CamperForm[] = [
  'alcove',
  'fullyIntegrated',
  'panelTruck',
];

// Form (vehicle type) icon mapping type
export type FormConfig = {
  key: CamperForm;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

// List of vehicle forms with corresponding icons
export const FORM_CONFIG: FormConfig[] = [
  { key: 'alcove', icon: TbCamper },
  { key: 'fullyIntegrated', icon: TbBus },
  { key: 'panelTruck', icon: TbCaravan },
];

export const CAMPER_EQUIPMENT: CamperEquipment[] = [
  'AC',
  'bathroom',
  'kitchen',
  'TV',
  'radio',
  'refrigerator',
  'microwave',
  'gas',
  'water',
];

// Equipment icon mapping type
export type EquipmentConfig = {
  key: CamperEquipment;
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

// List of equipment with corresponding icons
export const EQUIPMENT_CONFIG: EquipmentConfig[] = [
  { key: 'AC', icon: TbAirConditioning },
  { key: 'bathroom', icon: TbBath },
  { key: 'kitchen', icon: TbToolsKitchen2 },
  { key: 'TV', icon: TbDeviceTv },
  { key: 'radio', icon: TbRadio },
  { key: 'refrigerator', icon: TbFridge },
  { key: 'microwave', icon: TbMicrowave },
  { key: 'gas', icon: TbFlame },
  { key: 'water', icon: TbDroplet },
];

export const CAMPER_PRIMARY_FEATURES: Array<
  keyof Pick<
    Camper,
    'transmission' | 'engine' | 'form' | 'length' | 'width' | 'height' | 'tank' | 'consumption'
  >
> = [
  'transmission',
  'engine',
  'form',
  'length',
  'width',
  'height',
  'tank',
  'consumption',
];
