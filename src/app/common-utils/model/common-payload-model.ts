export class Payload {
    constructor(
        public metadata: Metadata,
        public payload: any
    ){}
}

export class Metadata {
    constructor(
        public secretId: string,
        public version: string,
        public timestamp: String,
        public requestId: string
    ){}
}