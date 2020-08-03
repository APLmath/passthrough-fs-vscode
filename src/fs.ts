import * as vscode from 'vscode';

export class PassthroughFS implements vscode.FileSystemProvider {

  private _onDidChangeFile = new vscode.EventEmitter<vscode.FileChangeEvent[]>();
  get onDidChangeFile(): vscode.Event<vscode.FileChangeEvent[]> {
    return this._onDidChangeFile.event;
  }

  watch(uri: vscode.Uri, options: { recursive: boolean; excludes: string[]; }): vscode.Disposable {
    return {
      dispose: () => {
          /* noop */
      }
    };
  }

  stat(uri: vscode.Uri): vscode.FileStat | Thenable<vscode.FileStat> {
		const fileUri = vscode.Uri.parse(`file://${uri.path}`);
    return vscode.workspace.fs.stat(uri);
  }
  readDirectory(uri: vscode.Uri): [string, vscode.FileType][] | Thenable<[string, vscode.FileType][]> {
		const fileUri = vscode.Uri.parse(`file://${uri.path}`);
    return vscode.workspace.fs.readDirectory(fileUri);
  }
  createDirectory(uri: vscode.Uri): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  readFile(uri: vscode.Uri): Uint8Array | Thenable<Uint8Array> {
		const fileUri = vscode.Uri.parse(`file://${uri.path}`);
    return vscode.workspace.fs.readFile(fileUri);
  }
  writeFile(uri: vscode.Uri, content: Uint8Array, options: { create: boolean; overwrite: boolean; }): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  delete(uri: vscode.Uri, options: { recursive: boolean; }): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  rename(oldUri: vscode.Uri, newUri: vscode.Uri, options: { overwrite: boolean; }): void | Thenable<void> {
    throw new Error("Method not implemented.");
  }
  
}