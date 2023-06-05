/********************************************************************************
 * Copyright (C) 2023 HuaweiCloud All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import * as codearts from '@codearts/plugin';
import { exposable, expose } from '@cloudide/messaging';
import { LogLevel, WebviewOptions } from '@codearts/core/lib/common/plugin-common';
import { AbstractBackend } from '@codearts/core/lib/node/plugin-api';

/**
 * Add your backend api in this class
 * Using '@expose' to expose your function to frontend
 */

export type createCustomDialogOption = Omit<WebviewOptions & codearts.DialogOptions, 'viewType' | 'title' | 'viewUrl'>

@exposable
export class Backend extends AbstractBackend {

    /**
     * function call to the backend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin backend
     * In this function you can call function exposed by frontend 
     */
    public async run(): Promise<void> {
        const retValue = await this.plugin.call('view_type_of_your_plugin_view::myplugin.page.myApi', 'this is a function call from backend');
        this.plugin.log(LogLevel.INFO, retValue);

        // register project wizard
        const opts: WebviewOptions = {
            viewType: 'viewType-project-demo',
            title: 'demo - from dialog demo',
            targetArea: 'left',
            iconPath: 'resources/icons/logo.png',
            viewUrl: 'local:resources/page/new-project.html',
            preserveFocus: true,
            index: 0
        };
        this.plugin.registerProjectWizardProvider(opts);
    }

    public stop(): void {

    }

    @expose('new_project_dialog')
    public createNewProjectDialog() {
        codearts.commands.executeCommand('viewType-project-demo.focus');
    }

    @expose('custom_dialog')
    public createCustomDialog(options: createCustomDialogOption) {
        const opts: WebviewOptions = {
            viewType: 'custom-dialog-demo',
            title: 'demo - from dialog demo',
            viewUrl: 'local:resources/page/custom.html',
            ...options
        }
        this.plugin.createWebviewViewDialog(opts)
    }

    @expose('custom_adaptive_dialog')
    public createCustomAdaptiveDialog(options: createCustomDialogOption) {
        const opts: WebviewOptions = {
            viewType: 'custom-dialog-demo',
            title: 'demo - from dialog demo',
            viewUrl: 'local:resources/page/custom.html',
            ...options
        }
        codearts.window.createWebviewViewDialog(
            new viewProvider(this.context.extensionUri), opts
        )
    }
}


export class viewProvider implements codearts.WebviewViewProvider {

    public static readonly viewType = 'test.View';

    private _view?: codearts.WebviewView;

    constructor(
        private readonly _extensionUri: codearts.Uri,
    ) { }

    public resolveWebviewView(
        webviewView: codearts.WebviewView,
        context: codearts.WebviewViewResolveContext,
        _token: codearts.CancellationToken,
    ) {
        this._view = webviewView;

        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,

            localResourceRoots: [
                this._extensionUri
            ]
        };

        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
    }


    private _getHtmlForWebview(webview: codearts.Webview) {
        const scriptUri = webview.asWebviewUri(codearts.Uri.joinPath(this._extensionUri, 'dist', 'browser', 'custom.js'));

        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">        
            <title>test Dialog</title>
            <style>
                .test {
                    white-space: nowrap;
                }
                .container {
                    width:300px;
                }
            </style>
        </head>
        <body
            <div class="container">
            <span class="test">test word from dialog-demo<span>
            <br/>
            <br/>
            <span><button disabled="disabled">test button</button></span>
            <script  src="${scriptUri}"></script>
            <div>
        </body>
        </html>`;
    }
}