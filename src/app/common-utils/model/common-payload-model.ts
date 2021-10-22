export class Payload {
    constructor(
        public metadata: Metadata,
        public data: any
    ){}
}

export class Metadata {
    constructor(
        public sKey: string,
        public version: string,
        public timestamp: String,
        public requestId: string
    ){}
}