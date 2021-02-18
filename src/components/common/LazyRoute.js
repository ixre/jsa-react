import React from "react";
// 延迟加载的路由
export const LazyRoute = ({component:Component, ...rest}) => (
    <React.Suspense fallback="">
        <Component {...rest} />
    </React.Suspense>
);
