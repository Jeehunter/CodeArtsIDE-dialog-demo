/********************************************************************************
 * Copyright (C) 2023 HuaweiCloud All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { PluginPage, AbstractFrontend } from '@codearts/core/lib/browser/plugin-api';
import { LogLevel } from '@codearts/core/lib/common/plugin-common';
import { exposable, expose } from '@cloudide/messaging';

@exposable
class CustomWebviewPageAPI extends AbstractFrontend {

    /**
     * function call to the frontend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    run(): void {

        const info = document.createElement('p');
        info.innerText = 'Info in custom.ts from dialog-demo';
        document.body.appendChild(info);

        this.plugin.log(LogLevel.INFO, 'dynamic webview page loaded!');
    }

    stop(): void {

    }

    @expose('myplugin.dynamic.page.print')
    public print(message: string): string {
        document.body.appendChild(document.createElement('pre')!.appendChild(document.createTextNode(`print function called, param: ${message}`)));
        return "myplugin.dynamic.page.print called";
    }

}

document.addEventListener('DOMContentLoaded', async function() {
    PluginPage.create([CustomWebviewPageAPI]);
});
