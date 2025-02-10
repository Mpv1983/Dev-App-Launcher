import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import CheckBoxField from '../../../component/checkbox-field.jsx';
import TextField from '../../../component/text-field.jsx';
import SelectField from '../../../component/select-field.jsx';
import handleChange, { handleCheckboxChange } from '../../../component/handleChange.js';
import './manage-app.css';

const CommandLineApp = forwardRef((props, ref) => {

    const [port, SetPort] = useState(0);
    const [isSslPort, SetIsSslPort] = useState(false);
    const [appName, SetAppName] = useState('');
    const [executable, SetExecutable] = useState('');
    const [path, SetPath] = useState('');
    const [appType, SetAppType] = useState('Not Set');
    const [url, SetUrl] = useState('');
    const [launchProfileOptions, SetLaunchProfileOptions] = useState(['']);
    const [launchProfile, SetLaunchProfile] = useState('');

    /** Expose methods to parent using useImperativeHandle */
    useImperativeHandle(ref, () => ({
        handleFileSelected(file) {
            SetAppName(`${file.name}`);
            SetExecutable(file.name.replace('csproj', 'exe'));
            SetPath(file.path);
            getProfileOptions(file);
        },
        getApplicationSettings() {
            return {
                port,
                isSslPort,
                name: appName,
                path,
                executable,
                appType,
                url,
                launchProfile
            };
        }
    }));

    function onUpdatePort(e) {
        var newPort = handleChange(e, SetPort);
        setAppUrl(appType, newPort);
    }

    function onUpdateAppType(e) {
        var newAppType = handleChange(e, SetAppType);
        setAppUrl(newAppType, port);
    }

    function setAppUrl(newAppType, newPort) {
        switch (newAppType) {
            case 'API with swagger':
                SetUrl(`http://localhost:${newPort}/swagger/index.html`);
                break;
            case 'UI':
                SetUrl(`http://localhost:${newPort}`);
                break;
        }
    }

    function getProfileOptions(file) {
        var launchSettingsFilePath = file.path.replace(file.name, 'Properties\\launchSettings.json');

        window.FileSystemService.readJsonFile({ fileName: launchSettingsFilePath })
            .then((launchSettings) => {
                if (launchSettings) {
                    SetLaunchProfileOptions([''].concat(Object.keys(launchSettings.profiles)));
                }
            });
    }

    return (
        <div className='left-align-container'>
            <div className='right-align-container manage-app-form'>
                <TextField label='App Name' value={appName} onChange={(e) => handleChange(e, SetAppName, updateSender)} />
                <TextField label='Executable' value={executable} onChange={(e) => handleChange(e, SetExecutable, updateSender)} />
                <div className='row'>
                    <TextField label='Port' value={port} onChange={onUpdatePort} />
                    <CheckBoxField label='SSL' value={isSslPort} onChange={(e) => handleCheckboxChange(e, SetIsSslPort, updateSender)} />
                </div>
                <SelectField label='Launch Profile' value={launchProfile} options={launchProfileOptions} onChange={(e) => handleChange(e, SetLaunchProfile, updateSender)} />
                <SelectField label='App Type' value={appType} options={['Not Set', 'API', 'API with swagger', 'UI', 'Console']} onChange={onUpdateAppType} />
                <TextField label='Url' value={url} onChange={(e) => handleChange(e, SetUrl, updateSender)} />
            </div>
        </div>
    );
});

export default CommandLineApp;
