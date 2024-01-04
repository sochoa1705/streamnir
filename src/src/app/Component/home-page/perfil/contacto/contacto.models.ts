export class DataPayload {
    constructor(
        public UserId:             number,
        public Firstname:          string,
        public FatherLastname:     string,
        public MotherLastname:     string,
        public Birthdate:          Date,
        public Nationality:        string,
        public CountryId:          number,
        public DocumentType:       string,
        public DocumentNumber:     string,
        public DocumentExpiration: string,
    ){}
}

export class ContactPayload {
    constructor(
        public UserId:         number,
        public CountryId:      number,
        public ProvinceId:     number,
        public CityId:         number,
        public Address:        string,
        public Number:         string,
        public InteriorNumber: string,
        public DistrictId:     number,
        public PostalCode:     string,
        public Phone:          string,
        public MobilePhone:    string,
    ){}
}

export class FormContact {
    constructor(
        public Firstname:          string,
        public FatherLastname:     string,
        public MotherLastname:     string,
        public Birthdate:          Date,
        public Nationality:        string,
        public CountryId:          number,
        public DocumentType:       string,
        public DocumentNumber:     string,
        public DocumentExpiration: string,
    ){}
}
