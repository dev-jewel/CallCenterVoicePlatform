namespace CallCenter.Infrastructure.Telephony;

public sealed record InboundCallNotification(string CallId, string FromNumber, string ToNumber, DateTimeOffset OccurredAtUtc);
public interface ITelephonyGateway { Task AcceptInboundEventAsync(InboundCallNotification notification, CancellationToken cancellationToken); }
public sealed class TelephonyGateway : ITelephonyGateway { public Task AcceptInboundEventAsync(InboundCallNotification notification, CancellationToken cancellationToken) => Task.CompletedTask; }
