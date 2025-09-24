import {DocumentStubWithPages} from "../type";

export class OkarinaUtil {

	public static getFragmentText(doc: DocumentStubWithPages, name: string) {
		if (!doc) return undefined;
		for (const page of doc.pages) {
			for (const fragment of page.fragments) {
				if (fragment.name === name) return fragment.text;
			}
		}
	}
}
