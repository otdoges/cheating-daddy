import { html, css, LitElement } from '../../assets/lit-core-2.7.4.min.js';

export class AssistantView extends LitElement {
    static styles = css`
        :host {
            height: 100%;
            display: flex;
            flex-direction: column;
            background-color: var(--main-content-background);
            border-radius: var(--content-border-radius);
            overflow: hidden;
        }

        * {
            font-family: 'Inter', sans-serif;
            cursor: default;
        }

        .chat-container {
            display: flex;
            flex-direction: column;
            height: 100%;
            padding: 10px;
        }

        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .message-bubble {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            position: relative;
            word-wrap: break-word;
            white-space: pre-wrap;
            font-size: var(--response-font-size, 16px);
            line-height: 1.5;
        }

        .user-message {
            align-self: flex-end;
            background-color: var(--user-message-background);
            color: var(--user-message-color);
            border-bottom-right-radius: 5px;
        }

        .ai-message {
            align-self: flex-start;
            background-color: var(--ai-message-background);
            color: var(--ai-message-color);
            border-bottom-left-radius: 5px;
        }

        .ai-label {
            font-size: 0.7em;
            color: var(--ai-label-color);
            margin-bottom: 5px;
            font-weight: 600;
        }

        .markdown-content {
            /* Markdown styling */
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
            margin: 1.2em 0 0.6em 0;
            color: var(--text-color);
            font-weight: 600;
        }

        .markdown-content h1 {
            font-size: 1.8em;
        }
        .markdown-content h2 {
            font-size: 1.5em;
        }
        .markdown-content h3 {
            font-size: 1.3em;
        }
        .markdown-content h4 {
            font-size: 1.1em;
        }
        .markdown-content h5 {
            font-size: 1em;
        }
        .markdown-content h6 {
            font-size: 0.9em;
        }

        .markdown-content p {
            margin: 0.8em 0;
            color: var(--text-color);
        }

        .markdown-content ul,
        .markdown-content ol {
            margin: 0.8em 0;
            padding-left: 2em;
            color: var(--text-color);
        }

        .markdown-content li {
            margin: 0.4em 0;
        }

        .markdown-content blockquote {
            margin: 1em 0;
            padding: 0.5em 1em;
            border-left: 4px solid var(--focus-border-color);
            background: rgba(0, 122, 255, 0.1);
            font-style: italic;
        }

        .markdown-content code {
            background: rgba(255, 255, 255, 0.1);
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.85em;
        }

        .markdown-content pre {
            background: var(--input-background);
            border: 1px solid var(--button-border);
            border-radius: 6px;
            padding: 1em;
            overflow-x: auto;
            margin: 1em 0;
        }

        .markdown-content pre code {
            background: none;
            padding: 0;
            border-radius: 0;
        }

        .markdown-content a {
            color: var(--link-color);
            text-decoration: none;
        }

        .markdown-content a:hover {
            text-decoration: underline;
        }

        .markdown-content strong,
        .markdown-content b {
            font-weight: 600;
            color: var(--text-color);
        }

        .markdown-content em,
        .markdown-content i {
            font-style: italic;
        }

        .markdown-content hr {
            border: none;
            border-top: 1px solid var(--border-color);
            margin: 2em 0;
        }

        .markdown-content table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
        }

        .markdown-content th,
        .markdown-content td {
            border: 1px solid var(--border-color);
            padding: 0.5em;
            text-align: left;
        }

        .markdown-content th {
            background: var(--input-background);
            font-weight: 600;
        }

        .messages-container::-webkit-scrollbar {
            width: 8px;
        }

        .messages-container::-webkit-scrollbar-track {
            background: var(--scrollbar-track);
            border-radius: 4px;
        }

        .messages-container::-webkit-scrollbar-thumb {
            background: var(--scrollbar-thumb);
            border-radius: 4px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
            background: var(--scrollbar-thumb-hover);
        }

        .input-area {
            display: flex;
            gap: 10px;
            padding: 10px;
            border-top: 1px solid var(--border-color);
            background-color: var(--main-content-background);
        }

        .input-area input {
            flex: 1;
            background: var(--input-background);
            color: var(--text-color);
            border: 1px solid var(--button-border);
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 14px;
        }

        .input-area input:focus {
            outline: none;
            border-color: var(--focus-border-color);
            box-shadow: 0 0 0 3px var(--focus-box-shadow);
            background: var(--input-focus-background);
        }

        .input-area input::placeholder {
            color: var(--placeholder-color);
        }

        .send-button,
        .new-chat-button {
            background: var(--start-button-background);
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 5px;
        }

        .send-button:hover,
        .new-chat-button:hover {
            background: var(--start-button-hover-background);
        }

        .copy-button {
            background: none;
            border: none;
            color: var(--text-color);
            cursor: pointer;
            position: absolute;
            top: 8px;
            right: 8px;
            opacity: 0.7;
            transition: opacity 0.2s ease;
        }

        .copy-button:hover {
            opacity: 1;
        }
    `;

    static properties = {
        messages: { type: Array },
        currentResponseIndex: { type: Number },
        selectedProfile: { type: String },
        onSendText: { type: Function },
        onNewChat: { type: Function },
    };

    constructor() {
        super();
        this.messages = [];
        this.currentResponseIndex = -1;
        this.selectedProfile = 'interview';
        this.onSendText = () => {};
        this.onNewChat = () => {};
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.log('Text copied to clipboard');
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    }

    handleNewChat() {
        this.messages = [];
        this.currentResponseIndex = -1;
        this.dispatchEvent(new CustomEvent('new-chat'));
        this.requestUpdate();
    }

    renderMarkdown(content) {
        // Check if marked is available
        if (typeof window !== 'undefined' && window.marked) {
            try {
                // Configure marked for better security and formatting
                window.marked.setOptions({
                    breaks: true,
                    gfm: true,
                    sanitize: false, // We trust the AI responses
                });
                const rendered = window.marked.parse(content);
                console.log('Markdown rendered successfully');
                return rendered;
            } catch (error) {
                console.warn('Error parsing markdown:', error);
                return content; // Fallback to plain text
            }
        }
        console.log('Marked not available, using plain text');
        return content; // Fallback if marked is not available
    }

    

    

    loadFontSize() {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize !== null) {
            const fontSizeValue = parseInt(fontSize, 10) || 20;
            const root = document.documentElement;
            root.style.setProperty('--response-font-size', `${fontSizeValue}px`);
        }
    }

    connectedCallback() {
        super.connectedCallback();

        // Load and apply font size
        this.loadFontSize();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    async handleSendText() {
        const textInput = this.shadowRoot.querySelector('#textInput');
        if (textInput && textInput.value.trim()) {
            const message = textInput.value.trim();
            textInput.value = ''; // Clear input
            await this.onSendText(message);
        }
    }

    handleTextKeydown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            this.handleSendText();
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            const container = this.shadowRoot.querySelector('.messages-container');
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0);
    }

    firstUpdated() {
        super.firstUpdated();
        this.updateResponseContent();
    }

    updated(changedProperties) {
        super.updated(changedProperties);
        if (changedProperties.has('responses') || changedProperties.has('currentResponseIndex')) {
            this.updateResponseContent();
        }
    }

    updateResponseContent() {
        // This method is no longer needed as rendering is handled directly in the render() method
        // by iterating over the messages array.
    }

    render() {
        return html`
            <div class="chat-container">
                <div class="messages-container">
                    ${this.messages.map(
                        message => html`
                            <div class="message-bubble ${message.type === 'user' ? 'user-message' : 'ai-message'}">
                                <div class="message-content">
                                    ${message.type === 'ai' ? html`<div class="ai-label">AI</div>` : ''}
                                    <div class="markdown-content">${this.renderMarkdown(message.text)}</div>
                                    ${message.type === 'ai'
                                        ? html`
                                              <button
                                                  class="copy-button"
                                                  @click=${() => this.copyToClipboard(message.text)}
                                                  title="Copy to clipboard"
                                              >
                                                  <svg
                                                      width="16px"
                                                      height="16px"
                                                      stroke-width="1.7"
                                                      viewBox="0 0 24 24"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      color="currentColor"
                                                  >
                                                      <path
                                                          d="M19.4 20H9.6C9.26863 20 9 19.7314 9 19.4V9.6C9 9.26863 9.26863 9 9.6 9H19.4C19.7314 9 20 9.26863 20 9.6V19.4C20 19.7314 19.7314 20 19.4 20Z"
                                                          stroke="currentColor"
                                                          stroke-width="1.7"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                      ></path>
                                                      <path
                                                          d="M15 9V4.6C15 4.26863 14.7314 4 14.4 4H4.6C4.26863 4 4 4.26863 4 4.6V14.4C4 14.7314 4.26863 15 4.6 15H9"
                                                          stroke="currentColor"
                                                          stroke-width="1.7"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                      ></path>
                                                  </svg>
                                              </button>
                                          `
                                        : ''}
                                </div>
                            </div>
                        `
                    )}
                </div>

                <div class="input-area">
                    <button class="new-chat-button" @click=${this.onNewChat}>New Chat</button>
                    <input type="text" id="textInput" placeholder="Type a message..." @keydown=${this.handleTextKeydown} />
                    <button class="send-button" @click=${this.handleSendText}>
                        <svg
                            width="24px"
                            height="24px"
                            stroke-width="1.7"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            color="currentColor"
                        >
                            <path
                                d="M10 14L21 3"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                            <path
                                d="M21 3L14.5 21L10.5 14.5L3 10.5L21 3Z"
                                stroke="currentColor"
                                stroke-width="1.7"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        `;
    }
}

customElements.define('assistant-view', AssistantView);
