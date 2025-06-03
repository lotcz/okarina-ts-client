import {LookupClient, RestClientWithOAuth} from "zavadil-ts-common";
import {ClientStats, OkarinaStats, Language} from "../type";
import {DocumentTemplatesClient} from "./DocumentTemplatesClient";
import {DocumentsClient} from "./DocumentsClient";
import {FoldersClient} from "./FoldersClient";
import {OAuthIdTokenProvider} from "zavadil-ts-common/dist/oauth/tokenprovider/OAuthIdTokenProvider";

export class OkarinaRestClient extends RestClientWithOAuth {

	languages: LookupClient<Language>;

	folders: FoldersClient;

	documentTemplates: DocumentTemplatesClient;

	documents: DocumentsClient;

	constructor(serverUrl: string, freshIdTokenProvider?: OAuthIdTokenProvider, defaultPrivilege: string = '*') {
		super(serverUrl, freshIdTokenProvider, defaultPrivilege);
		this.languages = new LookupClient<Language>(this, 'admin/enumerations/languages');
		this.folders = new FoldersClient(this);
		this.documentTemplates = new DocumentTemplatesClient(this, this.folders);
		this.documents = new DocumentsClient(this);
	}

	getClientStats(): ClientStats {
		return {
			documentTemplatesCache: this.documentTemplates.getStats(),
			folderChainCache: this.folders.folderChainStats()
		}
	}

	version(): Promise<string> {
		return this.get('status/version').then((r) => r.text());
	}

	stats(): Promise<OkarinaStats> {
		return this.getJson('status/stats');
	}

	// IMAGES

	loadImage(path: string, size?: string): Promise<string> {
		const params = {path: path, size: size};
		return this.get('admin/images', params)
			.then(
				(res) => res.blob().then((b) => URL.createObjectURL(b))
			);
	}

}
