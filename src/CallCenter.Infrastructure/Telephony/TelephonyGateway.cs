namespace CallCenter.Infrastructure.Telephony;

public sealed class TelephonyGateway : ITelephonyGateway
{
    public Task AcceptInboundEventAsync(InboundCallNotification notification, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}
