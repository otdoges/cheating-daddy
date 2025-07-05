import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class AnotherView extends LitElement {
    static styles = css`
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            font-size: 2em;
            color: var(--text-color);
        }
    `;

    render() {
        return html` <div>Another View</div> `;
    }
}

customElements.define('another-view', AnotherView);