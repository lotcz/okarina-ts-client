import {EntityClient, Page, PagingRequest, RestClient} from "zavadil-ts-common";
import {DocumentStubWithPages} from "../type";

export class DocumentsClient extends EntityClient<DocumentStubWithPages> {

	constructor(client: RestClient) {
		super(client, 'admin/documents');
	}

	// IMAGES

	uploadDocumentImage(documentId: number, f: File): Promise<DocumentStubWithPages> {
		let formData = new FormData();
		formData.append("file", f);
		return this.client.postFormJson(`${this.name}/${documentId}/upload-image`, formData);
	}

	uploadImageToFolder(folderId: number, f: File): Promise<DocumentStubWithPages> {
		let formData = new FormData();
		formData.append("file", f);
		return this.client.postFormJson(`${this.name}/upload-image/${folderId}`, formData);
	}

	loadByState(state: string, pr?: PagingRequest): Promise<Page<DocumentStubWithPages>> {
		return this.client.getJson(`${this.name}/by-state/${state}`, RestClient.pagingRequestToQueryParams(pr));
	}

	updateDocumentState(id: number, s: string): Promise<void> {
		return this.client.put(`${this.name}/${id}/state/${s}`).then();
	}

}
