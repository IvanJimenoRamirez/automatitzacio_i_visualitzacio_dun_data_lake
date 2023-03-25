import { Counter } from '../../components/Counter'

export default function ImageLayout({ children }) {
    return (
        <div>
            <Counter />
            {children}
        </div>
    )
}