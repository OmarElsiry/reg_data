export const apartmentsData = {
  'المنصورة الجديدة': {
    projectName: 'المنصورة الجديدة',
    buildings: [
      {
        buildingName: 'المرحلة الأولى - تسكين',
        buildingCode: 'A',
        apartments: [
          {
            id: 'A-1',
            type: 'دور أرضي',
            floor: 'أرضي',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 17500,
            totalPrice: 2275000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أرضي'
          },
          {
            id: 'A-2',
            type: 'دور أول',
            floor: 'أول',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 17500,
            totalPrice: 2275000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أول (وسط الدور الأول)'
          },
          {
            id: 'A-3',
            type: 'دور أعلى',
            floor: 'أعلى',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 17500,
            totalPrice: 2275000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أعلى'
          }
        ],
        totalUnits: 4,
        totalArea: 384,
        totalPrice: 6720000
      },
      {
        buildingName: 'المرحلة الثانية - تسكين',
        buildingCode: 'B',
        apartments: [
          {
            id: 'B-1',
            type: 'دور أرضي',
            floor: 'أرضي',
            area: 140,
            areaMin: 140,
            areaMax: 140,
            pricePerMeter: 17500,
            totalPrice: 2450000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أرضي'
          },
          {
            id: 'B-2',
            type: 'دور أول',
            floor: 'أول',
            area: 140,
            areaMin: 140,
            areaMax: 140,
            pricePerMeter: 17500,
            totalPrice: 2450000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أول (وسط الدور الأول)'
          },
          {
            id: 'B-3',
            type: 'دور أعلى',
            floor: 'أعلى',
            area: 140,
            areaMin: 140,
            areaMax: 140,
            pricePerMeter: 17500,
            totalPrice: 2450000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أعلى'
          }
        ],
        totalUnits: 4,
        totalArea: 384,
        totalPrice: 6720000
      }
    ]
  },
  'سكن مصر': {
    projectName: 'سكن مصر',
    buildings: [
      {
        buildingName: 'المرحلة الثانية - تسكين',
        buildingCode: 'A',
        apartments: [
          {
            id: 'A-1',
            type: 'دور أرضي',
            floor: 'أرضي',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 15900,
            totalPrice: 2067000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أرضي'
          },
          {
            id: 'A-2',
            type: 'دور أول',
            floor: 'أول',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 15900,
            totalPrice: 2067000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أول (وسط الدور الأول)'
          },
          {
            id: 'A-3',
            type: 'دور أعلى',
            floor: 'أعلى',
            area: 130,
            areaMin: 130,
            areaMax: 130,
            pricePerMeter: 15900,
            totalPrice: 2067000,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أعلى'
          }
        ],
        totalUnits: 4,
        totalArea: 384,
        totalPrice: 6201000
      },
      {
        buildingName: 'المرحلة الثانية - تسكين',
        buildingCode: 'B',
        apartments: [
          {
            id: 'B-1',
            type: 'دور أرضي',
            floor: 'أرضي',
            area: 115,
            areaMin: 115,
            areaMax: 115,
            pricePerMeter: 15900,
            totalPrice: 1828500,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أرضي'
          },
          {
            id: 'B-2',
            type: 'دور أول',
            floor: 'أول',
            area: 115,
            areaMin: 115,
            areaMax: 115,
            pricePerMeter: 15900,
            totalPrice: 1828500,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أول (وسط الدور الأول)'
          },
          {
            id: 'B-3',
            type: 'دور أعلى',
            floor: 'أعلى',
            area: 115,
            areaMin: 115,
            areaMax: 115,
            pricePerMeter: 15900,
            totalPrice: 1828500,
            rooms: 2,
            bathrooms: 2,
            description: 'دور أعلى'
          }
        ],
        totalUnits: 4,
        totalArea: 345,
        totalPrice: 5485500
      }
    ]
  }
};

export const buildingDetails = [
  {
    id: 1,
    project: 'جنة',
    city: 'المنصورة الجديدة',
    buildingName: 'المرحلة الأولى - تسكين',
    buildingCode: 'A',
    totalUnits: 4,
    totalArea: 384,
    pricePerMeter: 17500,
    totalPrice: 6720000,
    deposit: 150000,
    apartments: [
      { floor: 'أرضي', area: 130, price: 2275000, rooms: 2, bathrooms: 2 },
      { floor: 'أول (وسط)', area: 130, price: 2275000, rooms: 2, bathrooms: 2 },
      { floor: 'أعلى', area: 130, price: 2275000, rooms: 2, bathrooms: 2 }
    ]
  },
  {
    id: 2,
    project: 'جنة',
    city: 'المنصورة الجديدة',
    buildingName: 'المرحلة الثانية - تسكين',
    buildingCode: 'B',
    totalUnits: 4,
    totalArea: 384,
    pricePerMeter: 17500,
    totalPrice: 6720000,
    deposit: 150000,
    apartments: [
      { floor: 'أرضي', area: 140, price: 2450000, rooms: 2, bathrooms: 2 },
      { floor: 'أول (وسط)', area: 140, price: 2450000, rooms: 2, bathrooms: 2 },
      { floor: 'أعلى', area: 140, price: 2450000, rooms: 2, bathrooms: 2 }
    ]
  },
  {
    id: 3,
    project: 'سكن مصر',
    city: 'المنصورة الجديدة',
    buildingName: 'المرحلة الثانية - تسكين',
    buildingCode: 'A',
    totalUnits: 4,
    totalArea: 384,
    pricePerMeter: 15900,
    totalPrice: 6201000,
    deposit: 150000,
    apartments: [
      { floor: 'أرضي', area: 130, price: 2067000, rooms: 2, bathrooms: 2 },
      { floor: 'أول (وسط)', area: 130, price: 2067000, rooms: 2, bathrooms: 2 },
      { floor: 'أعلى', area: 130, price: 2067000, rooms: 2, bathrooms: 2 }
    ]
  },
  {
    id: 4,
    project: 'سكن مصر',
    city: 'المنصورة الجديدة',
    buildingName: 'المرحلة الثانية - تسكين',
    buildingCode: 'B',
    totalUnits: 4,
    totalArea: 345,
    pricePerMeter: 15900,
    totalPrice: 5485500,
    deposit: 150000,
    apartments: [
      { floor: 'أرضي', area: 115, price: 1828500, rooms: 2, bathrooms: 2 },
      { floor: 'أول (وسط)', area: 115, price: 1828500, rooms: 2, bathrooms: 2 },
      { floor: 'أعلى', area: 115, price: 1828500, rooms: 2, bathrooms: 2 }
    ]
  }
];
