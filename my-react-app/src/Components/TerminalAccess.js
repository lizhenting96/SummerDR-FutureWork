import React, { useState, useEffect } from 'react';
import Terminal from 'react-bash';
import { Paper } from '@material-ui/core';

export default function TerminalAccess() {
    const [commandData, setCommandData] = useState('');

    // initial history and initial file system structure
    const history = [
        { value: 'Type `help` to begin' },
    ];
    const structure = {
        public: {
            file1: { content: 'The is the content for file1 in the <public> directory.' },
            file2: { content: 'The is the content for file2 in the <public> directory.' },
            file3: { content: 'The is the content for file3 in the <public> directory.' },
        },
        'README.md': { content: 'Some readme' },
    };

    const sudo = {
        exec: ({ structure, history, cwd }) => {
            return {
                structure, cwd,
                history: history.concat({ value: 'Nice try...' }),
            };
        },
    }

    const extensions = { sudo }

    return (
        <div style={{ height: 580 }}>
            <Terminal history={history} structure={structure} extensions={extensions} prefix={"user@HOMEPC"} />
        </div>
    )
}