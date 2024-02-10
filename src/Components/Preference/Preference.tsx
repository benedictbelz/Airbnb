import * as React from 'react';
import { Language, availableLanguages } from '../../@types/typeLanguage';
import { getLanguage } from '../../@presets/language';
import './Preference.scss';

interface Props {
    language: Language;
    changeLanguage: Function;
}

interface States {
    showList: boolean;
}

export class Preference extends React.Component<Props, States> {

    state = {
        showList: false
    }

    renderLanguage(language: Language) {
        return (
            <>
                <div className='flag'>
                    <img src={`assets/languages/${getLanguage('en', `language_${language}`).toLowerCase()}.svg`}/>
                </div>
                <p>{getLanguage(this.props.language, `language_${language}`)}</p>
            </>
        );
    }

    render() {
        return (
            <div id='preference'>
                <div id='selection' onClick={() => this.setState({ showList: !this.state.showList })}>
                    {this.renderLanguage(this.props.language)}
                    <div id='arrow' style={this.state.showList ? {} : { transform: 'rotate(180deg)'}}/>
                </div>
                {this.state.showList ? (
                    <ul>
                        {availableLanguages.map((language: Language) => 
                            <li 
                                key={language} 
                                onClick={() => {
                                    this.props.changeLanguage(language);
                                    this.setState({ showList: false });
                                }}
                            >
                                {this.renderLanguage(language)}
                            </li>
                        )}
                    </ul>
                ) : null}
            </div>
        )
    }
}