import React from "react";
import { Loading } from '../../ui/components/utils/loading/Loading';

export const Suspense = (Component: React.LazyExoticComponent<() => JSX.Element>) => {
    return <React.Suspense fallback={<Loading width={150} height={150} full />}>
        <Component />
    </React.Suspense>
}