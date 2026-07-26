namespace CallCenter.Infrastructure.Telephony;

public interface ITelephonyGateway
{
    Task AcceptInboundEventAsync(InboundCallNotification notification, CancellationToken cancellationToken);
}
