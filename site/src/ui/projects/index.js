﻿import React , { PureComponent } from 'react';
import { List, Datagrid, TextInput , Create , Edit , TabbedForm , Show ,ReferenceField , ShowButton ,
    SimpleShowLayout , EditButton , FormTab , TextField , Responsive, SimpleList } from 'admin-on-rest/lib/mui';
// import RichTextInput from 'aor-rich-text-input';
import FileInput , { FilePreview, ImagePreview } from '../FileInput'
import IOSInstallLink from '../IOSInstallLink';
import baseUrl from '../../server/baseUrl';
import QRCodeField from '../QRCodeField';
import ProjectName from './ProjectName';
import PluginInput from '../plugins';

export class ProjectList extends PureComponent{
    render(){
        return (<List {...this.props}>
        <Responsive
            small={
                    <SimpleList
                        primaryText={record => record.name}
                        secondaryTextLines={2}
                        secondaryText={record => 
                            <div>
                                <div>IOS: {record.lastRelease&&record.lastRelease.ios?record.lastRelease.ios.version:''}</div>
                                <div>Android: {record.lastRelease&&record.lastRelease.android?record.lastRelease.android.version:''}</div>
                            </div>
                        }
                        tertiaryText={record => record.desc}
                    />
            }
            medium={
                <Datagrid>
                    <ProjectName source="name" />
                    {/* <TextField source="name" /> */}
                    <TextField source="desc" />
                    <TextField source="lastRelease.ios.version" label="IOS版本"/>
                    <TextField source="lastRelease.android.version" label="Android版本"/>
                    <EditButton />
                    <ShowButton/>
                </Datagrid>
            }
            />
        </List>);
    }
}

export class ProjectCreate extends PureComponent{
    render(){
        return (
            <Create {...this.props}>
                <TabbedForm>
                    <FormTab label="基本信息">
                        <TextInput label="项目名称" source="name" />
                        <TextInput label="项目表述" source="desc" />
                        <TextInput label="应用ID" source="appId"/>
                        <FileInput url="./upload" source="icon" placeholder="点击上传图标">
                            <ImagePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput label="项目svn地址" source="ios.svn.url" />
                        <TextInput label="项目svn用户" source="ios.svn.userName" />
                        <TextInput label="项目svn密码" source="ios.svn.password" type="password"/>
                        <TextInput label="应用ID" source="ios.appId"/>
                        <FileInput url="./upload" source="ios.certificate.file" placeholder="IOS发布证书(.p12)">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="证书密码" source="ios.certificate.password" type="password"/>
                        <FileInput url="./upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <TextInput label="应用ID" source="android.appId"/>
                        <FileInput url="./upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="签名用户" source="android.keyStore.userName" />
                        <TextInput label="签名密码" source="android.keyStore.password" type="password"/>
                    </FormTab>
                    <FormTab label="微信">
                        <TextInput source="wechat.appId" label="appID" />
                        <TextInput source="wechat.appsecret" label="appsecret"  />
                    </FormTab>
                    <FormTab label="插件">
                        <PluginInput source="plugins" />
                    </FormTab>
                </TabbedForm>
            </Create>
        )
    }
}

export class ProjectEdit extends PureComponent{
    render(){
        return (
            <Edit {...this.props}>
                <TabbedForm>
                    <FormTab label="基本信息">
                        <TextInput label="项目名称" source="name" />
                        <TextInput label="项目表述" source="desc" />
                        <TextInput label="应用ID" source="appId"/>
                        <FileInput url="./upload" source="icon" placeholder="点击上传图标">
                            <ImagePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="IOS">
                        <TextInput label="项目svn地址" source="ios.svn.url" />
                        <TextInput label="项目svn用户" source="ios.svn.userName" />
                        <TextInput label="项目svn密码" source="ios.svn.password" type="password"/>
                        <TextInput label="应用ID" source="ios.appId"/>
                        <FileInput url="./upload" source="ios.certificate.file" placeholder="IOS发布证书(.p12)">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="证书密码" source="ios.certificate.password" type="password"/>
                        <FileInput url="./upload" source="ios.mobileProvision" placeholder="上传IOS打包用签名文件">
                            <FilePreview/>
                        </FileInput>
                    </FormTab>
                    <FormTab label="Android">
                        <TextInput source="android.svn.url" />
                        <TextInput source="android.svn.userName" />
                        <TextInput source="android.svn.password" type="password"/>
                        <TextInput label="应用ID" source="android.appId"/>
                        <FileInput url="./upload" source="android.keyStore.file" placeholder="上传Android打包签名文件">
                            <FilePreview/>
                        </FileInput>
                        <TextInput label="签名用户" source="android.keyStore.userName" />
                        <TextInput label="签名密码" source="android.keyStore.password" type="password"/>
                    </FormTab>
                    <FormTab label="微信">
                        <TextInput source="wechat.appId" label="appID" />
                        <TextInput source="wechat.appsecret" label="appsecret"  />
                    </FormTab>
                    <FormTab label="插件">
                        <PluginInput source="plugins" />
                    </FormTab>
                </TabbedForm>
            </Edit>
        )
    }
}


export class ProjectShow extends PureComponent{
    render(){
        return (<Show {...this.props} hasEdit={false} actions={<div/>} hasList={true}>
            <SimpleShowLayout>
                <TextField label="项目" source="name" />
                <TextField source="lastRelease.ios.version" label="IOS版本"/>
                <TextField source="lastRelease.android.version" label="Android版本"/>
                <QRCodeField text={ (record)=>`${baseUrl}/#/projects/${record.id}/show`} source="id" label="二维码"/>
                <ReferenceField source="lastRelease.ios.taskId" reference="tasks" addLabel={false} elStyle={{textDecoration: 'none'}}>
                    <IOSInstallLink addLabel = {true} label = "" buttonLabel="IOS安装" source = "targetUrl"/>
                </ReferenceField>
                <ReferenceField style={{paddingTop:10}} source="lastRelease.android.taskId" reference="tasks" addLabel={false} elStyle={{textDecoration: 'none'}}>
                    <IOSInstallLink addLabel = {true} label = "" buttonLabel="Android安装" source = "targetUrl"/>
                </ReferenceField>
            </SimpleShowLayout>
        </Show>)
    }
}
