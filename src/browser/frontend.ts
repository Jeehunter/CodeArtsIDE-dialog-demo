/********************************************************************************
 * Copyright (C) 2023 HuaweiCloud All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/

import { LogLevel } from '@codearts/core/lib/common/plugin-common';
import { PluginPage, AbstractFrontend } from '@codearts/core/lib/browser/plugin-api';
import { exposable, expose } from '@cloudide/messaging';
import { Button } from '@cloud/ide-ui';
import { createCustomDialogOption } from '../node/backend';

/**
 * Adding your frontend api in this class
 * Using '@expose' to expose your function to backend
 */
@exposable
class Frontend extends AbstractFrontend {

    /**
     * function call to the frontend will wait until init() to be resolved
     */
    async init(): Promise<void> {

    }

    /**
     * Entry of your plugin frontend
     * In this function your can call function exposed by backend
     */
    run(): void {

        const introduction = document.createElement('p');
        introduction.innerText = this.plugin.localize('plugin.leftPanel.introduction');
        document.body.appendChild(introduction);

        const newProjectIntroduction = document.createElement('p');
        newProjectIntroduction.innerText = this.plugin.localize('plugin.leftPanel.newProjectIntroduction');
        document.body.appendChild(newProjectIntroduction);


        const newProjectDialogBtn = new Button({
            title: this.plugin.localize('plugin.leftPanel.newProjectDialogBtn'),
            label: this.plugin.localize('plugin.leftPanel.newProjectDialogBtn')
        })
        document.body.appendChild(newProjectDialogBtn);
        newProjectDialogBtn.onclick = () => {
            this.plugin.call('new_project_dialog');
        }

        const br = document.createElement('br');
        document.body.appendChild(br);

        const customPart = document.createElement('div');
        customPart.style.paddingTop = '20px';
        document.body.appendChild(customPart);

        const customDialogIntroduction = document.createElement('p');
        customPart.appendChild(customDialogIntroduction);
        customDialogIntroduction.innerText = this.plugin.localize('plugin.leftPanel.customDialogIntroduction');


        const defaultIntroductionItem = this.createCustomDialogIntroductionItem(
            this.plugin.localize('plugin.leftPanel.customDialogIntroduction.default'),
            () => {
                const opts: createCustomDialogOption = {};
                this.plugin.call('custom_dialog', opts);
            });
        customPart.appendChild(defaultIntroductionItem);

        const secondIntroductionItem = this.createCustomDialogIntroductionItem(
            this.plugin.localize('plugin.leftPanel.customDialogIntroduction.second'),
            () => {
                const opts: createCustomDialogOption = {
                    resizeable: true,
                    draggable: true,
                    modal: true
                };
                this.plugin.call('custom_dialog', opts)
            }
        )
        customPart.appendChild(secondIntroductionItem);

        const thirdIntroductionItem = this.createCustomDialogIntroductionItem(
            this.plugin.localize('plugin.leftPanel.customDialogIntroduction.third'),
            () => {
                const opts: createCustomDialogOption = {
                    height: 400,
                    width: 600,
                    left: 300,
                    top: 300,
                    noTitleBar: true,
                    modal: true
                }
                this.plugin.call('custom_dialog', opts);
            }
        )
        customPart.appendChild(thirdIntroductionItem);

        const forthIntroductionitem = this.createCustomDialogIntroductionItem(
            this.plugin.localize('plugin.leftPanel.customDialogIntroduction.forth'),
            () => {
                const opts: createCustomDialogOption = {
                    draggable: true,
                    modal: true,
                    noTitleBar: false
                };
                this.plugin.call('custom_adaptive_dialog', opts);
            }
        )
        customPart.appendChild(forthIntroductionitem);

    }

    createCustomDialogIntroductionItem(introductionText: string, handle: () => void) {
        const item = document.createElement('div');
        const introduction = document.createElement('p');
        item.appendChild(introduction);
        introduction.innerText = introductionText;

        const button = new Button({
            title: this.plugin.localize('plugin.leftPanel.customDialogBtn'),
            label: this.plugin.localize('plugin.leftPanel.customDialogBtn')
        })
        button.onclick = handle;
        item.appendChild(button);
        return item;
    }


    stop(): void {

    }

    @expose('myplugin.page.myApi')
    public myApi(message: string): string {
        console.log(message);
        return 'this is a return value from frontend function';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    PluginPage.create([Frontend]);
});
