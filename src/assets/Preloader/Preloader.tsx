import { LoadingDots } from './LoadingDots';
import c from './Preloader.module.scss';

export const Preloader = () => {

    return <div className={c.preloaderWrap}>
        <div className={c.container}>
            <LoadingDots />
        </div>
    </div>
}