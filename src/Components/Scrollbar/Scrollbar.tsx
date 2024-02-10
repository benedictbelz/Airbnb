import * as React from 'react';
import { TypeDevice } from '../../@types/typeDevice';
import './Scrollbar.scss';

interface Props {
    color: 'Black' | 'White';
    currentDevice: TypeDevice | null;
    id: string;
}

interface States {
    element: HTMLElement | null;
    scroll: number;
}

export class Scrollbar extends React.Component<Props, States> {

    constructor(props: any) {
        super(props);

        this.state = {
            element: null,
            scroll: 0
        }

        setTimeout(() => this.initScrollbar());
    }

    initScrollbar() {
        // IF MOBILE RETURN
        if (this.props.currentDevice === 'Mobile') {
            return;
        }
        // GET ELEMENT
        const element = document.querySelector('#' + this.props.id + '>.content') as unknown as HTMLElement;
        // SET ELEMENT
        this.setState({ element });
        // EVENT LISTENER SCROLL
        element.addEventListener('scroll', () => this.update());
        // EVENT LISTENER RESIZE
        window.addEventListener('resize', () => this.update());
    }

    update() {
        // GET VARIABLES
        let height = this.state.element.scrollHeight - this.state.element.clientHeight;
        let scroll = this.state.element.scrollTop;
        let percentage = Math.floor(scroll/height*1000)/1000;
        // BOUNDARY
        if (percentage <= 0 || isNaN(percentage)) {
            percentage = 0;
        }
        if (percentage >= 1 && height !== 0) {
            percentage = 1;
        }
        // UPDATE SCROLL
        this.setState({ scroll: percentage });
    }

	render() {
		return (
            <div id={this.props.id}>
                {this.props.currentDevice === 'Mobile' && this.props.children}
                {this.props.currentDevice === 'Desktop' &&
                    <>
                        <div className={[
                            'scrollbar',
                            this.state.element ? this.state.element.id : '',
                            this.props.color === 'Black' ? 'black' : 'white'
                        ].filter((x) => x).join(' ')}>
                            <div style={ { transform: 'scaleY(' + this.state.scroll + ')' } }/>
                        </div>
                        <div className='content'>
                            {this.props.children}
                        </div>
                    </>
                }
            </div>
        );
	}
}