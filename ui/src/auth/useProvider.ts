import useProviders, { Provider } from './useProviders';

export default function useProvider(providerId: string) {
    const { isLoading, error, data } = useProviders();
    let provider: Provider | undefined = undefined;
    
    if (data) {
        provider = data.find(provider => provider.provider_id === providerId);
    }

    return { isLoading, error, data: provider };
}