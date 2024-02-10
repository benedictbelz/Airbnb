import * as React from 'react';
import './Loader.scss';

interface Props {
    color: 'Black' | 'White';
    isLoading: boolean;
    percentage: number;
}

interface States {
    isTransition: boolean;
    isVisible: boolean;
}

export class Loader extends React.Component<Props, States> {

    state: States = {
        isTransition: true,
        isVisible: true
    }

    componentDidUpdate(prevProps: any) {
        if (!this.props.isLoading && prevProps.isLoading) {
            setTimeout(() => this.setState({ isTransition: true, isVisible: false }), 500);
        }
        if (this.props.isLoading && !prevProps.isLoading) {
            this.setState({ isTransition: false, isVisible: true });
        }
    }

	render() {
		return (
            <div className={[
                    'loader',
                    this.props.color === 'Black' ? 'black' : 'white',
                    this.state.isTransition ? 'transition' : '',
                    this.state.isVisible ? 'show' : ''
                ].filter(x => x).join(' ')}
            >
                <div id='circle'></div>
                <div id='percentage'>{this.props.percentage}%</div>
            </div>
        );
	}
}
