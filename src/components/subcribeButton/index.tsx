import { useSession, signIn } from 'next-auth/client'
import { api } from '../../services/api';
import { getStripejs } from '../../services/stripeJS';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession();
    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return;
        }
        try {
            const response = await api.post('/subscribe')
            const { sessionId } = response.data;
            const stripe = await getStripejs();
            await stripe.redirectToCheckout({sessionId: sessionId});
        } catch (err) {
            alert(err.message);
        }
    }
    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}