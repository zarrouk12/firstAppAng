export interface Member {
    id?: string;  // json-server uses this for REST operations
    ID: string;
    CIN: string;
    Name:  string;
    Type: string;
    CV: string;
    CreatedDate: string;
}