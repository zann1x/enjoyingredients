const React = require('react');

exports.onRenderBody = ({ setHeadComponents }) => {
    if (process.env.NODE_ENV === 'development') {
        return null;
    }

    const plausibleSnippetProps = {
        async: true,
        defer: true,
        'data-domain': 'enjoyingredients.com',
        src: 'https://pla.enjoyingredients.com/js/plausible.js'
    };

    return setHeadComponents([
        <script {...plausibleSnippetProps} />,
        <script dangerouslySetInnerHTML={{
            __html: 'window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }'
        }} />
    ]);
};
