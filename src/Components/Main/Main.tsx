import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Loader } from '../Loader/Loader';
import { Preference } from '../Preference/Preference';
import { Scrollbar } from '../Scrollbar/Scrollbar';
import { TypeBrowser } from '../../@types/typeBrowser';
import { TypeDevice } from '../../@types/typeDevice';
import { Language } from '../../@types/typeLanguage';
import { getLanguage } from '../../@presets/language';
import '../../General/General.scss';
import './Main.scss';

interface States {
	currentBrowser: TypeBrowser | null;
	currentDevice: TypeDevice | null;
	language: Language;
	isLoading: boolean;
    isRendered: boolean;
    percentage: number;
}

class Main extends React.Component<{}, States> {

	state: States = {
		currentBrowser: null,
		currentDevice: null,
		language: 'en',
		isLoading: true,
        isRendered: false,
        percentage: 0
	}

	componentDidMount() {
		this.initBrowser();
		this.initDevice();
		this.initImages();
	}

	initBrowser() {
		if (navigator.userAgent.indexOf('Chrome') > -1) {
			this.setState({ currentBrowser: 'Chrome' });
		}
		if (navigator.userAgent.indexOf('Firefox') > -1) {
			this.setState({ currentBrowser: 'Firefox' });
		}
		if (navigator.userAgent.indexOf('MSIE') > -1) {
			this.setState({ currentBrowser: 'Microsoft' });
		}
		if (navigator.userAgent.toLowerCase().indexOf('op') > -1) {
			this.setState({ currentBrowser: 'Opera' });
		}
		if (navigator.userAgent.indexOf('Safari') > -1) {
			this.setState({ currentBrowser: 'Safari' });
		}
	}

	initDevice() {
		if ('ontouchstart' in window || 'onmsgesturechange' in window) {
			this.setState({ currentDevice: 'Mobile' });
		} else {
			this.setState({ currentDevice: 'Desktop' });
		}
	}

	async initImages() {
		let images = document.images;
        await new Promise<void>(resolve => {
            if (images.length === 0) {
                resolve();
            }
            let index = 0;
            const loadImage = () => {
                const getNextImage = () => {
                    index++;
                    if (index !== images.length) {
                        this.setState({ percentage: Math.floor(index/images.length*100) });
                        setTimeout(loadImage, 5);
                    } else if (this.state.currentDevice === 'Desktop' && !this.state.isRendered) {
                        const interval = setInterval(() => {
                            if (!this.state.isRendered) {
                                clearInterval(interval);
                                this.setState({ isLoading: false, percentage: 100 });
                            }
                        }, 50); 
                    } else {
                        resolve();
                    }
                };
                const image = new Image();
                image.src = images[index].src;
                image.onload = () => getNextImage();
                image.onerror = () => getNextImage();
            };
        });
        this.setState({ isLoading: false, percentage: 100 });
	}

	render() {
		return (
			<div 
				id='main'
				className={[
					this.state.currentDevice === 'Desktop' ? 'desktop' : 'mobile',
				].filter(x => x).join(' ')}
			>
				<Loader color='White' isLoading={this.state.isLoading} percentage={this.state.percentage}/>
				<Scrollbar color='Black' currentDevice={this.state.currentDevice} id='form'>
					<header>
						<p>{getLanguage(this.state.language, 'title')}</p>
						<Preference
							language={this.state.language}
							changeLanguage={(language: Language) => this.setState({ language })}
						/>
					</header>
					<form action="/action_page.php">
						<input type="text" pattern="[A-Za-z]" name="fname"/>
						<input type="text" pattern="[A-Za-z]" name="fname"/>
					{/* First name: <input type="text" pattern="[A-Za-z]" name="fname"><br>
					Last name: <input type="text" pattern="[A-Za-z]" name="lname"><br>
						<input type="submit" value="Submit"> */}
					</form>
					{/* {Array.apply(null, { length: 50 }).map((element: any, index: number) => (
						<span className="busterCards" key={index} style={{display: 'block'}}>
							♦
						</span>
					))} */}
				</Scrollbar>
			</div>
		);
	}
}

ReactDOM.render(<Main />, document.getElementById('root'));
