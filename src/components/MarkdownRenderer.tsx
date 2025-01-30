import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const MarkdownRenderer = ({ string }: { string: string }) => {
    return (
        <div>
      <ReactMarkdown remarkPlugins={[remarkBreaks]}>{string}</ReactMarkdown>
      </div>
    );
};

export default MarkdownRenderer;