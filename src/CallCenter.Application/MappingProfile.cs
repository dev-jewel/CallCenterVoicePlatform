using AutoMapper;
using CallCenter.Application.DTOs;
using CallCenter.Domain.Entities;

namespace CallCenter.Application;

public sealed class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Agent, AgentDto>();

        CreateMap<CreateAgentRequest, Agent>()
            .ForMember(
                dest => dest.Id,
                opt => opt.Ignore());
    }
}
