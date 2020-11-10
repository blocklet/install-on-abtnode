/* eslint-disable arrow-parens */
import React, { useContext, useState, useEffect } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

import { LocaleContext } from '@arcblock/ux/lib/Locale/context';
import Loading from '../components/loading';
import Confirm from '../components/confirm';
import Layout from '../components/layout/index';
import TablbeList from '../components/abtnode/list';
import TableTips from '../components/abtnode/tips';
import useSettingConfirm from '../components/confirm_config';
import { formatToDatetime } from '../libs/utils';

// from abtnode
// action="node-register"&endpoint={abtnode_endpoint}

// from blocklet
// action="blocklet-install"&mete_url={blocklet_meta_url}

export default function IndexPage() {
  const { t, changeLocale, locale } = useContext(LocaleContext);
  const urlParams = new URLSearchParams(window.location.search);

  const [abtnodes, setAbtnodes] = useLocalStorage('abtnodes', []);
  const [currentSetting, setCurrentSetting] = useState(null);
  const [settings, setSettings] = useState(useSettingConfirm());
  const [loading, setLoading] = useState(false);
  const rows = Array.isArray(abtnodes) ? abtnodes : [];

  useEffect(() => {
    changeLocale(urlParams.get('__blang__') || locale);
  });

  settings.showABTNodeInfoSetting.onConfirm = async (params) => {
    if (params.status !== 'error') {
      if (abtnodes) {
        const index = abtnodes.findIndex((x) => x.did === params.did);
        if (index > -1) {
          abtnodes[index].info = params.info;
        } else {
          abtnodes.push(params);
        }
        setAbtnodes([...abtnodes]);
      } else {
        setAbtnodes([params]);
      }
    }

    setCurrentSetting(null);
  };

  settings.showABTNodeInfoSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  settings.selectNodeListSetting.onConfirm = (data) => {
    if (data.select) {
      const url = data.select.endsWith('/') ? `${data.select}blocklets` : `${data.select}/blocklets`;
      window.location.href = `${url}?action=install&url=${urlParams.get('meta_url')}`;
    }
    setLoading(false);
    setCurrentSetting(null);
  };
  settings.selectNodeListSetting.onCancel = () => {
    setLoading(false);
    setCurrentSetting(null);
  };

  const onDelete = (did) => {
    const index = abtnodes.findIndex((x) => x.did === did);
    abtnodes.splice(index, 1);
    setAbtnodes([...abtnodes]);
  };

  const showABTNodeInfo = () => {
    let info = {};
    try {
      info = JSON.parse(urlParams.get('info'));
      settings.showABTNodeInfoSetting.params = {
        info,
        list: [
          {
            key: t('abtnode.table.url'),
            value: info.url,
          },
          {
            key: t('abtnode.table.name'),
            value: info.name,
          },
          {
            key: t('abtnode.table.description'),
            value: info.description,
          },
          {
            key: t('abtnode.table.did'),
            value: info.did,
          },
          {
            key: t('abtnode.table.createdAt'),
            value: formatToDatetime(info.createdAt),
          },
        ],
        did: info.did,
      };
      setSettings(settings);
      setLoading(false);
      setCurrentSetting('showABTNodeInfoSetting');
    } catch (error) {
      console.error(error);
      settings.showABTNodeInfoSetting.params = {
        status: 'error',
      };
      setSettings(settings);
      setCurrentSetting('showABTNodeInfoSetting');
    }
  };

  const showListInfo = () => {
    settings.selectNodeListSetting.params = {
      nodes: rows,
      select: rows.length ? rows[0].info.url : '',
    };
    setSettings(settings);
    setLoading(false);
    setCurrentSetting('selectNodeListSetting');
  };

  useEffect(() => {
    if (urlParams.get('action') === 'node-register' && urlParams.get('info')) {
      setLoading(true);

      showABTNodeInfo();
    }

    if (urlParams.get('action') === 'blocklet-install' && urlParams.get('meta_url')) {
      setLoading(true);

      showListInfo();
    }
  }, []); // eslint-disable-line

  return (
    <Layout title="Install On ABT Node">
      {rows.length ? <TablbeList rows={rows} onDelete={onDelete} /> : <TableTips />}

      {loading && <Loading />}
      {currentSetting && settings[currentSetting] && (
        <Confirm
          title={settings[currentSetting].title}
          description={settings[currentSetting].description}
          confirm={settings[currentSetting].confirm}
          color={settings[currentSetting].color}
          cancel={settings[currentSetting].cancel}
          params={settings[currentSetting].params}
          onConfirm={settings[currentSetting].onConfirm}
          onCancel={settings[currentSetting].onCancel}
          open={settings[currentSetting].open}
        />
      )}
    </Layout>
  );
}
