interface LotteryType {
    id: number;
    name: string;
    url: string;
    img: string;
    price: string;
}

export interface Profile {
    firstName: string;
    lastName: string;
    email: string;
    ticketQty: string;
    birthDate: string;
    zip: string;
    country: string;
    profileName?: string;
}
