import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

import CenteredContent from '~/layouts/centeredContent';
import SiteLayout from '~/layouts/siteLayout';
import config from '~/config';
import { usePlausible } from '~/packages/next-plausible';

const NotFound: React.FC = () => {
    const { t } = useTranslation('common');
    const plausible = usePlausible();

    useEffect(() => {
        plausible('404', {
            props: { path: window.location.pathname },
        });
    }, []);

    return (
        <>
            <Head>
                <title>{`${t('404_title')} - ${config.siteTitle}`}</title>
                <meta name="robots" content="noindex, nofollow, noarchive" />
            </Head>
            <SiteLayout>
                <CenteredContent>
                    <StyledText>{t('404_not_found')}</StyledText>
                </CenteredContent>
            </SiteLayout>
        </>
    );
};

export default NotFound;

export const getStaticProps: GetStaticProps = async (context) => {
    return {
        props: {
            ...(await serverSideTranslations(context.locale, ['common'])),
        },
    };
};

const StyledText = styled.p`
    text-align: center;
    font-size: 1.5rem;
`;
